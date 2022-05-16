import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da task.',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descrição da task.',
    type: String,
  })
  @IsNotEmpty()
  description: string;
}
