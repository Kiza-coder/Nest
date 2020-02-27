import { TaskStatus } from './../task-status.enum'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class GetTasksFilter{
    @IsOptional()
    @IsIn([TaskStatus.IN_PROGRESS,TaskStatus.OPEN,TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}