import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import systemconfig from '../../common/system';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

@ApiTags('products')
@Controller(`${systemconfig.API_VERSION}/products`)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ResponseDto<Product>> {
    const product = await this.productService.createProduct(dto);
    return new ResponseDto(201, 'Tạo sản phẩm thành công', product);
  }

  @Patch('/edit/:id')
  async editProduct(
    @Param('id') id: number,
    @Body() dto: EditProductDto,
  ): Promise<ResponseDto<Product>> {
    const product = await this.productService.editProduct(id, dto);
    return new ResponseDto(200, 'Cập nhật sản phẩm thành công', product);
  }

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('/detail/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'ID của sản phẩm cần xem chi tiết',
  })
  async getOneProduct(@Param('id') id: number): Promise<ResponseDto<Product>> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return new ResponseDto(200, '', product);
  }

  @Delete('delete/:id')
  async deleteOneProduct(
    @Param('id') id: number,
  ): Promise<ResponseDto<Product | null>> {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Sản phẩm ID = ${id} không tồn tại!`);
    }

    const deleted = await this.productService.deleteOneProduct(id);

    return new ResponseDto(200, 'Xóa sản phẩm thành công', deleted);
  }
}
