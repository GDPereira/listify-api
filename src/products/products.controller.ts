import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { PasetoGuard } from "src/paseto/paseto.guard";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(PasetoGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(PasetoGuard)
  @Post()
  insertMany() {
    return this.productsService.insertExampleData();
  }
}
