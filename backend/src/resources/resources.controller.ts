import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { mkdirSync } from 'node:fs';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { ResourceFetchIntent } from './resources.service';
import { ResourcesService } from './resources.service';

const RESOURCE_UPLOAD_DIR = join(process.cwd(), 'uploads', 'resources');

interface UploadedResourceFile {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

@Controller('resources')
@UseGuards(JwtAuthGuard)
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  getResources() {
    return this.resourcesService.getResources();
  }

  @Get('files/:filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Query('intent') intentRaw: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const intent: ResourceFetchIntent =
      intentRaw?.toLowerCase() === 'download' ? 'download' : 'view';

    const { stream, mime, safeBasename, accessTag } = await this.resourcesService.openReadStream(
      filename,
      intent,
    );

    if (accessTag === 'restricted') {
      res.setHeader('Cache-Control', 'private, no-store');
      res.setHeader('X-Resource-Access', 'restricted');
    }

    return new StreamableFile(stream, {
      type: mime,
      disposition: `inline; filename="${safeBasename.replaceAll('"', '')}"`,
    });
  }

  @Post('upload')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          try {
            mkdirSync(RESOURCE_UPLOAD_DIR, { recursive: true });
            callback(null, RESOURCE_UPLOAD_DIR);
          } catch (error) {
            callback(error as Error, '');
          }
        },
        filename: (_req, file, callback) => {
          const extension = extname(file.originalname || '');
          const safeExtension = extension ? extension.toLowerCase() : '.pdf';
          callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExtension}`);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  async uploadResource(
    @UploadedFile() file?: UploadedResourceFile,
    @Body('accessTag') accessTagRaw?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded. Use multipart/form-data with field "file".');
    }

    const accessTag = this.resourcesService.normalizeAccessTag(accessTagRaw ?? 'standard');

    await this.resourcesService.registerUploadedResource({
      storedFilename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      accessTag,
    });

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      accessTag,
      path: this.resourcesService.getPublicPath(file.filename),
    };
  }
}
