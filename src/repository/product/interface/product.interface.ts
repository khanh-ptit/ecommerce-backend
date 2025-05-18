import { CreateProductDto } from 'src/components/product/dto/create-product.dto';
import { EditProductDto } from 'src/components/product/dto/edit-product.dto';
import { Product } from 'src/entities/product.entity';

export interface IProductRepository {
  create(dto: CreateProductDto): Promise<Product>;
  edit(id: number, dto: EditProductDto): Promise<Product>;
  findAll(
    page: number,
    limit: number,
    sortKey: keyof Product,
    sortValue: 'ASC' | 'DESC',
  ): Promise<{
    data: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
  }>;
  findById(id: number): Promise<Product | null>;
  deleteOne(id: number): Promise<Product | null>;
  softDelete(id: number): Promise<Product | null>;
}
