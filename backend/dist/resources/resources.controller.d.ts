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
    uploadResource(file?: UploadedResourceFile): {
        filename: string;
        originalName: string;
        mimetype: string;
        size: number;
        path: string;
    };
}
export {};
