import { Injectable } from '@nestjs/common';
import { ProductService } from './product/product.service';

@Injectable()
export class AppService {
  constructor(
    private readonly productService: ProductService
  ){}

  async getPages(): Promise<any> {
      return await this.productService.getProducts();
  }
}
