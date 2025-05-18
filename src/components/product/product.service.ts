import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { IProductRepository } from 'src/repository/product/interface/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
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
}
