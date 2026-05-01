import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, promises as fs } from 'node:fs';
import { basename, extname, join } from 'node:path';
import type { Readable } from 'node:stream';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import type { ResourceAccessTag } from './digital-resource.entity';
import { DigitalResourceEntity } from './digital-resource.entity';

export type ResourceFetchIntent = 'view' | 'download';

export interface ResourceListItem {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: string;
  accessTag: ResourceAccessTag;
}

@Injectable()
export class ResourcesService {
  private readonly uploadDir = join(process.cwd(), 'uploads', 'resources');

  constructor(
    @InjectRepository(DigitalResourceEntity)
    private readonly digitalResourcesRepository: Repository<DigitalResourceEntity>,
  ) {}

  async ensureUploadDirectory() {
    await fs.mkdir(this.uploadDir, { recursive: true });
  }

  getUploadDirectory() {
    return this.uploadDir;
  }

  /**
   * API-relative URL for authenticated download via GET /resources/files/:filename
   */
  getPublicPath(filename: string) {
    const safe = this.assertSafeBasename(filename);
    return `/resources/files/${encodeURIComponent(safe)}`;
  }

  assertSafeBasename(filename: string): string {
    const decoded = decodeURIComponent(filename.trim());

    if (!decoded || decoded.includes('..')) {
      throw new BadRequestException('Invalid filename.');
    }
    if (decoded.includes('/') || decoded.includes('\\')) {
      throw new BadRequestException('Invalid filename.');
    }

    const base = basename(decoded);
    if (!base || base !== decoded) {
      throw new BadRequestException('Invalid filename.');
    }

    return base;
  }

  normalizeAccessTag(raw: unknown): ResourceAccessTag {
    const value = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
    if (!value || value === 'standard') {
      return 'standard';
    }
    if (value === 'restricted') {
      return 'restricted';
    }
    throw new BadRequestException('accessTag must be "standard" or "restricted".');
  }

  async registerUploadedResource(payload: {
    storedFilename: string;
    originalName: string;
    mimetype: string;
    size: number;
    accessTag: ResourceAccessTag;
  }) {
    const entity = this.digitalResourcesRepository.create({
      id: randomUUID(),
      storedFilename: payload.storedFilename,
      originalName: payload.originalName.trim() || payload.storedFilename,
      mimetype: payload.mimetype || 'application/octet-stream',
      size: payload.size,
      accessTag: payload.accessTag,
    });

    await this.digitalResourcesRepository.save(entity);

    return entity;
  }

  private mimeFromFilename(filename: string): string {
    const ext = extname(filename).toLowerCase();
    const map: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.zip': 'application/zip',
      '.doc': 'application/msword',
      '.docx':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return map[ext] ?? 'application/octet-stream';
  }

  async openReadStream(
    filename: string,
    intent: ResourceFetchIntent,
  ): Promise<{
    stream: Readable;
    mime: string;
    safeBasename: string;
    accessTag: ResourceAccessTag;
  }> {
    const safe = this.assertSafeBasename(filename);
    const absolutePath = join(this.uploadDir, safe);

    try {
      await fs.access(absolutePath);
    } catch {
      throw new NotFoundException('File not found.');
    }

    const record = await this.digitalResourcesRepository.findOne({
      where: { storedFilename: safe },
    });

    const accessTag: ResourceAccessTag = record?.accessTag ?? 'standard';

    if (accessTag === 'restricted' && intent === 'download') {
      throw new ForbiddenException(
        'This document is restricted: download and copy actions are not permitted.',
      );
    }

    return {
      stream: createReadStream(absolutePath),
      mime: record?.mimetype ?? this.mimeFromFilename(safe),
      safeBasename: safe,
      accessTag,
    };
  }

  async getResources(): Promise<ResourceListItem[]> {
    await this.ensureUploadDirectory();

    const records = await this.digitalResourcesRepository.find({
      order: { createdAt: 'DESC' },
    });

    return records.map((row) => ({
      id: row.id,
      filename: row.storedFilename,
      originalName: row.originalName,
      mimetype: row.mimetype,
      size: row.size,
      path: this.getPublicPath(row.storedFilename),
      uploadedAt: row.createdAt.toISOString(),
      accessTag: row.accessTag,
    }));
  }
}
