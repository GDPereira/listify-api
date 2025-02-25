import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/schemas/product.schema";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll() {
    return {
      success: true,
      data: { products: await this.productModel.find() },
    };
  }

  async insertExampleData() {
    const products: Pick<Product, "name" | "price">[] = Array(10000)
      .fill("")
      .map((_, index) => ({
        name: `Product ${index + 1}`,
        price: Number((Math.random() * 99 + 1).toFixed(2)),
      }));

    await this.productModel.insertMany(products);

    return { success: true };
  }
}
