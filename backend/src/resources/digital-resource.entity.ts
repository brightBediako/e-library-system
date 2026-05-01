import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Controls whether the file may be fetched for download / save-as (view-in-app may still be allowed). */
export type ResourceAccessTag = 'standard' | 'restricted';

@Entity({ name: 'digital_resources' })
export class DigitalResourceEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  /** Filename on disk under uploads/resources (unique). */
  @Column({ name: 'stored_filename', type: 'varchar', length: 255, unique: true })
  storedFilename: string;

  @Column({ name: 'original_name', type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 120 })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  /**
   * When `restricted`, API rejects intent=download; clients should only offer in-app viewing.
   */
  @Column({ name: 'access_tag', type: 'varchar', length: 20, default: 'standard' })
  accessTag: ResourceAccessTag;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
