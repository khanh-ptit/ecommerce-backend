import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/repository/order/interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepo: IOrderRepository
  ) {}

  async createOrder(dto: CreateOrderDto) {
    return this.orderRepo.createOrder(dto);
  }
}
