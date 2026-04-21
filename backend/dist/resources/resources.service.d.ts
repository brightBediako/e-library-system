export interface ResourceListItem {
    id: string;
    filename: string;
    originalName: string;
    mimetype: string;
    size: number;
    path: string;
    uploadedAt: string;
}
export declare class ResourcesService {
    private readonly uploadDir;
    ensureUploadDirectory(): Promise<void>;
    getUploadDirectory(): string;
    getPublicPath(filename: string): string;
    getResources(): Promise<ResourceListItem[]>;
}
