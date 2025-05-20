import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
