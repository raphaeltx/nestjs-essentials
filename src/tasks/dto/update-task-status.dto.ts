import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @ApiProperty({
    name: 'Status',
    description: 'Novo status da task.',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
