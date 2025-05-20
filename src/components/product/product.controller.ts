import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import systemconfig from '../../common/system';
import { ProductService } from './product.service';
import { Product } from 'src/entities/product.entity';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

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

  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Trang hiện tại',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 2,
    description: 'Số lượng sản phẩm mỗi trang',
  })
  @ApiQuery({
    name: 'sortKey',
    required: false,
    type: String,
    example: 'price',
    description: 'Trường cần sắp xếp (id, name, price, description)',
  })
  @ApiQuery({
    name: 'sortValue',
    required: false,
    type: String,
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    description: 'Thứ tự sắp xếp (tăng/giảm dần)',
  })
  @Get()
  async getAll(@Query() query: ProductQueryDto): Promise<ResponseDto<any>> {
    const products = await this.productService.getAllProducts(query);
    return new ResponseDto(200, 'Lấy danh sách sản phẩm thành công', products);
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

  @Delete('soft-delete/:id')
  async softDelete(
    @Param('id') id: number,
  ): Promise<ResponseDto<Product | null>> {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Sản phẩm ID = ${id} không tồn tại!`);
    }

    const deleted = await this.productService.softDelete(id);

    return new ResponseDto(200, 'Xóa mềm sản phẩm thành công', deleted);
  }
}
