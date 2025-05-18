import { IsOptional, IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 1;

  @IsOptional()
  @IsIn(['id', 'name', 'price', 'description'])
  sortKey: 'id' | 'name' | 'price' | 'description' = 'id';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sortValue: 'ASC' | 'DESC' = 'ASC';
}
