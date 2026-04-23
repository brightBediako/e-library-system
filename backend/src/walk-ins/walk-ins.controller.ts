import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { WalkInsService } from './walk-ins.service';

interface CheckInBody {
  studentName: string;
  indexNo: string;
  className: string;
}

@Controller('walk-ins')
@UseGuards(JwtAuthGuard)
export class WalkInsController {
  constructor(private readonly walkInsService: WalkInsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  getWalkIns() {
    return this.walkInsService.getWalkIns();
  }

  @Post('check-in')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  checkIn(@Body() body: CheckInBody) {
    return this.walkInsService.checkIn(body);
  }

  @Patch(':id/check-out')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  checkOut(@Param('id') id: string) {
    return this.walkInsService.checkOut(id);
  }
}
