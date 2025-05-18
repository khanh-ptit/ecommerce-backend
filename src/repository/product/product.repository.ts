import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from './interface/product.interface';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/components/product/dto/create-product.dto';
import { EditProductDto } from 'src/components/product/dto/edit-product.dto';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    sortKey: keyof Product,
    sortValue: 'ASC' | 'DESC',
  ): Promise<{
    data: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortKey]: sortValue,
      },
    });

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findById(id: number): Promise<Product | null> {
    return this.repo.findOneById(id);
  }

  async deleteOne(id: number): Promise<Product | null> {
    const product = await this.repo.findOne({ where: { id } });

    if (!product) {
      return null;
    }

    await this.repo.remove(product);
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const newProduct = this.repo.create(dto);
    return this.repo.save(newProduct);
  }

  async edit(id: number, dto: EditProductDto): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });

    if (!product) {
      throw new Error(`Sản phẩm ID = ${id} không tồn tại`);
    }

    const updated = this.repo.merge(product, dto);
    return this.repo.save(updated);
  }

  async softDelete(id: number): Promise<Product | null> {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      return null;
    }
    await this.repo.softDelete(id);
    return product;
  }
}
