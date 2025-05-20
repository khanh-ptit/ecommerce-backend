import { CreateCustomerDto } from 'src/components/customer/dto/create-customer.dto';
import { EditCustomerDto } from 'src/components/customer/dto/edit-customer.dto';
import { Customer } from 'src/entities/customer.entity';

export interface ICustomerRepository {
  getAllCustomer(): Promise<Customer[]>;
  createCustomer(dto: CreateCustomerDto): Promise<Customer>;
  getCustomer(id: number): Promise<Customer | null>;
  deleteCustomer(id: number): Promise<Customer | null>;
  editCustomer(id: number, dto: EditCustomerDto): Promise<Customer | null>;
  restoreCustomer(id: number): Promise<Customer | null>;
}
