import { IsArray, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @Min(1)
  customerId: number;

  @IsArray()
  @IsInt({ each: true })
  productIds: number[];
}
