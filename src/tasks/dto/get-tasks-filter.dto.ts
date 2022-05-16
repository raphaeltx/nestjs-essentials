import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @ApiProperty({
    description: 'Status da task.',
    enum: TaskStatus,
    required: false
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'Search string a buscar.',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  search: string;
}
