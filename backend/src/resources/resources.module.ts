import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DigitalResourceEntity } from './digital-resource.entity';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DigitalResourceEntity])],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
