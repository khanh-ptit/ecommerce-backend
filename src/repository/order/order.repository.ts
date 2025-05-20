import { InjectRepository } from '@nestjs/typeorm';
import { IOrderRepository } from './interface/order.interface';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/components/order/dto/create-order.dto';
import { Customer } from 'src/entities/customer.entity';
import { Product } from 'src/entities/product.entity';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepo.findOneBy({ id: dto.customerId });
    if (!customer) {
      throw new Error(`Customer ID = ${dto.customerId} not found`);
    }

    const products = await this.productRepo.findByIds(dto.productIds);
    if (products.length !== dto.productIds.length) {
      throw new Error('Một hoặc nhiều sản phẩm không tồn tại');
    }

    const newOrder = this.orderRepo.create({
      customer,
      products,
    });

    return this.orderRepo.save(newOrder);
  }
}
