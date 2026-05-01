import { WalkInsService } from './walk-ins.service';
interface CheckInBody {
    studentName: string;
    indexNo: string;
    className: string;
}
export declare class WalkInsController {
    private readonly walkInsService;
    constructor(walkInsService: WalkInsService);
    getWalkIns(): Promise<import("./walk-in.entity").WalkInEntity[]>;
    checkIn(body: CheckInBody): Promise<import("./walk-in.entity").WalkInEntity>;
    checkOut(id: string): Promise<import("./walk-in.entity").WalkInEntity>;
}
export {};
