import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from 'src/repository/product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductService,
    ProductRepository,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
