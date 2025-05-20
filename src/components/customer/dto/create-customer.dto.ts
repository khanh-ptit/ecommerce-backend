import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Lê Quốc Khánh' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Thái Bình' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: '0987654321' })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
