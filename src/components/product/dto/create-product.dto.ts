import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Đồng hồ Curnon Kodo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3200000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Thiết kế tối giản, phù hợp giới trẻ' })
  @IsString()
  description: string;
}
