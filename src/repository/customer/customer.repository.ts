import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerRepository } from './interface/customer.interface';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from 'src/components/customer/dto/create-customer.dto';
import { EditCustomerDto } from 'src/components/customer/dto/edit-customer.dto';

export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.repo.find({
      withDeleted: true,
    });
    return customers;
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.repo.create(dto);
    return await this.repo.save(newCustomer);
  }

  async getCustomer(id: number): Promise<Customer | null> {
    const customer = await this.repo.findOne({ where: { id: id } });
    if (!customer) {
      return null;
    }
    return customer;
  }

  async deleteCustomer(id: number): Promise<Customer | null> {
    const customerDelete = await this.repo.findOne({ where: { id: id } });
    if (!customerDelete) {
      return null;
    }
    await this.repo.softDelete(id);
    return customerDelete;
  }

  async editCustomer(
    id: number,
    dto: EditCustomerDto,
  ): Promise<Customer | null> {
    const customer = await this.repo.findOne({ where: { id } });

    if (!customer) {
      throw new Error(`Khách hàng ID = ${id} không tồn tại`);
    }

    const updated = this.repo.merge(customer, dto);
    return this.repo.save(updated);
  }

  async restoreCustomer(id: number): Promise<Customer | null> {
    // Kiểm tra xem bản ghi đã bị xóa mềm có tồn tại không (dù đã bị xóa)
    const deletedCustomer = await this.repo.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!deletedCustomer || !deletedCustomer.deletedAt) {
      // Không tồn tại hoặc chưa bị xoá mềm → không cần restore
      return null;
    }

    await this.repo.restore(id);
    return deletedCustomer;
  }
}
