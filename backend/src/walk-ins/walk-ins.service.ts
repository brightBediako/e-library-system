import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { IsNull, Repository } from 'typeorm';
import { WalkInEntity } from './walk-in.entity';

interface CheckInPayload {
  studentName: string;
  indexNo: string;
  className: string;
}

@Injectable()
export class WalkInsService {
  constructor(
    @InjectRepository(WalkInEntity)
    private readonly walkInsRepository: Repository<WalkInEntity>,
  ) {}

  getWalkIns() {
    return this.walkInsRepository.find({
      order: { timeIn: 'DESC' },
    });
  }

  async checkIn(payload: CheckInPayload) {
    const studentName = payload.studentName.trim();
    const indexNo = payload.indexNo.trim().toUpperCase();
    const className = payload.className.trim();

    if (!studentName || !indexNo || !className) {
      throw new BadRequestException(
        'studentName, indexNo and className are required.',
      );
    }

    const existingActiveEntry = await this.walkInsRepository.findOne({
      where: {
        indexNo,
        timeOut: IsNull(),
      },
    });

    if (existingActiveEntry) {
      throw new BadRequestException(
        'Student already has an active walk-in session.',
      );
    }

    const walkIn = this.walkInsRepository.create({
      id: randomUUID(),
      studentName,
      indexNo,
      className,
      timeIn: new Date(),
      timeOut: null,
    });

    return this.walkInsRepository.save(walkIn);
  }

  async checkOut(id: string) {
    const walkIn = await this.walkInsRepository.findOneBy({ id });

    if (!walkIn) {
      throw new NotFoundException('Walk-in record not found.');
    }

    if (walkIn.timeOut) {
      throw new BadRequestException('Student already checked out.');
    }

    walkIn.timeOut = new Date();
    return this.walkInsRepository.save(walkIn);
  }
}
