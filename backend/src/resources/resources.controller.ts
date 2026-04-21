import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ResourcesService } from './resources.service';

const RESOURCE_UPLOAD_DIR = join(process.cwd(), 'uploads', 'resources');

interface UploadedResourceFile {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
}

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  getResources() {
    return this.resourcesService.getResources();
  }

  @Post('upload')
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
  uploadResource(@UploadedFile() file?: UploadedResourceFile) {
    if (!file) {
      throw new BadRequestException('No file uploaded. Use multipart/form-data with field "file".');
    }

    return {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: this.resourcesService.getPublicPath(file.filename),
    };
  }
}
