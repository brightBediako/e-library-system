import { Repository } from 'typeorm';
import { WalkInEntity } from './walk-in.entity';
interface CheckInPayload {
    studentName: string;
    indexNo: string;
    className: string;
}
export declare class WalkInsService {
    private readonly walkInsRepository;
    constructor(walkInsRepository: Repository<WalkInEntity>);
    getWalkIns(): Promise<WalkInEntity[]>;
    checkIn(payload: CheckInPayload): Promise<WalkInEntity>;
    checkOut(id: string): Promise<WalkInEntity>;
}
export {};
