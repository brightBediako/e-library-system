import type { Readable } from 'node:stream';
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
export declare class ResourcesService {
    private readonly digitalResourcesRepository;
    private readonly uploadDir;
    constructor(digitalResourcesRepository: Repository<DigitalResourceEntity>);
    ensureUploadDirectory(): Promise<void>;
    getUploadDirectory(): string;
    getPublicPath(filename: string): string;
    assertSafeBasename(filename: string): string;
    normalizeAccessTag(raw: unknown): ResourceAccessTag;
    registerUploadedResource(payload: {
        storedFilename: string;
        originalName: string;
        mimetype: string;
        size: number;
        accessTag: ResourceAccessTag;
    }): Promise<DigitalResourceEntity>;
    private mimeFromFilename;
    openReadStream(filename: string, intent: ResourceFetchIntent): Promise<{
        stream: Readable;
        mime: string;
        safeBasename: string;
        accessTag: ResourceAccessTag;
    }>;
    getResources(): Promise<ResourceListItem[]>;
}
