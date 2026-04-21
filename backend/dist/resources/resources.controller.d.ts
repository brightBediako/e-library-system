import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { ResourcesService } from './resources.service';
interface UploadedResourceFile {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
}
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    getResources(): Promise<import("./resources.service").ResourceListItem[]>;
    downloadFile(filename: string, intentRaw: string | undefined, res: Response): Promise<StreamableFile>;
    uploadResource(file?: UploadedResourceFile, accessTagRaw?: string): Promise<{
        filename: string;
        originalName: string;
        mimetype: string;
        size: number;
        accessTag: import("./digital-resource.entity").ResourceAccessTag;
        path: string;
    }>;
}
export {};
