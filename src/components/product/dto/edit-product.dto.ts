import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class EditProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 3200000 })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Thiết kế tối giản, phù hợp giới trẻ' })
  @IsString()
  @IsOptional()
  description: string;
}
