export type ResourceAccessTag = 'standard' | 'restricted';
export declare class DigitalResourceEntity {
    id: string;
    storedFilename: string;
    originalName: string;
    mimetype: string;
    size: number;
    accessTag: ResourceAccessTag;
    createdAt: Date;
    updatedAt: Date;
}
