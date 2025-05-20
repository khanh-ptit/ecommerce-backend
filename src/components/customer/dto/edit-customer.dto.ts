import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditCustomerDto {
  @ApiProperty({ example: 'Lê Quốc Khánh' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: '........' })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({ example: '0123456789' })
  @IsOptional()
  @IsString()
  phone: string;
}
