import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { CustomerRepository } from 'src/repository/customer/customer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    CustomerService,
    CustomerRepository,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
