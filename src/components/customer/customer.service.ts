import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from 'src/repository/customer/interface/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from 'src/entities/customer.entity';
import { EditCustomerDto } from './dto/edit-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async getAllCustomers() {
    return await this.customerRepository.getAllCustomer();
  }

  async createCustomers(dto: CreateCustomerDto): Promise<Customer> {
    return await this.customerRepository.createCustomer(dto);
  }

  async getCustomer(id: number) {
    return await this.customerRepository.getCustomer(id);
  }

  async deleteCustomer(id: number) {
    return await this.customerRepository.deleteCustomer(id);
  }

  async editCustomer(id: number, dto: EditCustomerDto) {
    return await this.customerRepository.editCustomer(id, dto);
  }

  async restoreCustomer(id: number) {
    return await this.customerRepository.restoreCustomer(id);
  }
}
