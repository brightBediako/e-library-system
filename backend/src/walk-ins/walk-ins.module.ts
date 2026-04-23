import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { WalkInEntity } from './walk-in.entity';
import { WalkInsController } from './walk-ins.controller';
import { WalkInsService } from './walk-ins.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalkInEntity]), AuthModule],
  controllers: [WalkInsController],
  providers: [WalkInsService],
})
export class WalkInsModule {}
