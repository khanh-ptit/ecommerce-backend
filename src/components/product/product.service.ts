import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { IProductRepository } from 'src/repository/product/interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(query: ProductQueryDto) {
    const { page, limit, sortKey, sortValue } = query;
    return this.productRepository.findAll(page, limit, sortKey, sortValue);
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async deleteOneProduct(id: number): Promise<Product | null> {
    return this.productRepository.deleteOne(id);
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(dto);
  }

  async editProduct(id: number, dto: EditProductDto): Promise<Product> {
    return this.productRepository.edit(id, dto);
  }

  async softDelete(id: number) {
    return this.productRepository.softDelete(id);
  }
}
