import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductModule } from './components/product/product.module';
import { CustomerModule } from './components/customer/customer.module';
import { OrderModule } from './components/order/order.module';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      entities: [Product, Order, Customer],
    }),
    ProductModule,
    CustomerModule,
    OrderModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('✅ Database connected successfully!');
    } else {
      console.error('❌ Database not connected.');
    }
  }
}
