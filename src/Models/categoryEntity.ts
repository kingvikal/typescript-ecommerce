import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Product } from "./productEntity";
enum CategoryEnum {
  FASHION = "fashion",
  BEAUTY = "beauty",
  TOYS = "toys",
  GAMES = "games",
  SHOES = "shoes",
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  product: Product[];

  @Column({ type: "enum", enum: CategoryEnum, default: CategoryEnum.FASHION })
  categoryType: CategoryEnum;
}
