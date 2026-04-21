import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

export interface ResourceListItem {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedAt: string;
}

@Injectable()
export class ResourcesService {
  private readonly uploadDir = join(process.cwd(), 'uploads', 'resources');

  async ensureUploadDirectory() {
    await fs.mkdir(this.uploadDir, { recursive: true });
  }

  getUploadDirectory() {
    return this.uploadDir;
  }

  getPublicPath(filename: string) {
    return `/uploads/resources/${filename}`;
  }

  async getResources(): Promise<ResourceListItem[]> {
    await this.ensureUploadDirectory();

    const files = await fs.readdir(this.uploadDir);

    const items = await Promise.all(
      files.map(async (filename) => {
        const filePath = join(this.uploadDir, filename);
        const stats = await fs.stat(filePath);

        return {
          id: filename,
          filename,
          originalName: filename,
          mimetype: 'application/octet-stream',
          size: stats.size,
          path: this.getPublicPath(filename),
          uploadedAt: stats.birthtime.toISOString(),
        };
      }),
    );

    return items.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    );
  }
}
