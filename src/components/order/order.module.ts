import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderRepository } from 'src/repository/order/order.repository';
import { CustomerRepository } from 'src/repository/customer/customer.repository';
import { ProductRepository } from 'src/repository/product/product.repository';
import { Customer } from 'src/entities/customer.entity';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, Product])],
  providers: [
    OrderService,
    OrderRepository,
    CustomerRepository,
    ProductRepository,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}


