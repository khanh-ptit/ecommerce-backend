import { CreateOrderDto } from 'src/components/order/dto/create-order.dto';
import { Order } from 'src/entities/order.entity';

export interface IOrderRepository {
  createOrder(dto: CreateOrderDto): Promise<Order>;
}
