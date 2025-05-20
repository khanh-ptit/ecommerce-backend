import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Delete,
  Patch,
} from '@nestjs/common';

import systemConfig from '../../common/system';
import { CustomerService } from './customer.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiParam } from '@nestjs/swagger';
import { EditCustomerDto } from './dto/edit-customer.dto';

@Controller(`${systemConfig.API_VERSION}/customers`)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll(): Promise<ResponseDto<any>> {
    const customers = await this.customerService.getAllCustomers();
    return new ResponseDto(
      200,
      'Đã lấy danh sách người dùng thành công!',
      customers,
    );
  }

  @Post('create')
  async createCustomer(
    @Body() dto: CreateCustomerDto,
  ): Promise<ResponseDto<any>> {
    const newCustomer = await this.customerService.createCustomers(dto);
    return new ResponseDto(201, 'Tạo khách hàng thành công!', newCustomer);
  }

  @Patch('edit/:id')
  // @ApiBod
  async editCustomer(
    @Param('id') id: number,
    @Body() dto: EditCustomerDto,
  ): Promise<ResponseDto<any>> {
    const customer = await this.customerService.editCustomer(id, dto);
    return new ResponseDto(
      200,
      'Cập nhật thông tin cho khách hàng thành công!',
      customer,
    );
  }

  @Patch('restore/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Nhập id của khách hàng',
  })
  async restoreCustomer(@Param('id') id: number): Promise<ResponseDto<any>> {
    const customerRestore = await this.customerService.restoreCustomer(id);
    return new ResponseDto(
      200,
      'Khôi phục thành công khách hàng',
      customerRestore,
    );
  }

  @Get('detail/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Id của khách hàng',
  })
  async getCustomer(@Param('id') id: number): Promise<ResponseDto<any>> {
    const customer = await this.customerService.getCustomer(id);
    if (!customer) {
      throw new HttpException(
        new ResponseDto(
          404,
          `Không tồn tại thông tin cho khách hàng có id = ${id}`,
          null,
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    return new ResponseDto(200, 'Đã lấy thông tin của khách hàng!', customer);
  }

  @Delete('delete/:id')
  async deleteCustomer(@Param('id') id: number): Promise<ResponseDto<any>> {
    const customer = await this.customerService.getCustomer(id);
    if (!customer) {
      throw new HttpException(
        new ResponseDto(
          404,
          `Không tồn tại thông tin của khách hàng có id = ${id}`,
          null,
        ),
        HttpStatus.NOT_FOUND,
      );
    }
    const deletedCustomer = await this.customerService.deleteCustomer(id);
    return new ResponseDto(
      200,
      'Đã xóa thành công khách hàng',
      deletedCustomer,
    );
  }
}
