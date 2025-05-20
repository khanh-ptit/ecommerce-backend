import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(@Body() dto: CreateOrderDto): Promise<ResponseDto<any>> {
    try {
      const order = await this.orderService.createOrder(dto);
      return new ResponseDto(201, 'Tạo đơn hàng thành công!', order);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(400, error.message, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
