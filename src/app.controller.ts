import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  @Render('index')
  async root(@Res() res: Response): Promise<any> {
    const products: [] = await this.appService.getPages();
    const featuredProducts = products.filter((product: any) => product.id < 4);
    const lastedProductsP1 = products.filter((product: any) => product.id > 2 && product.id <  7);
    const lastedProductsP2 = products.filter((product: any) => product.id > 8);
    return {featuredProducts, lastedProductsP1, lastedProductsP2}
  }

  @Get('contact')
  @Render('contact')
  contact(){
    
  }

  @Get('about')
  @Render('about')
  about(){

  }

  @Get('bank')
  @Render('bank')
  bank(){
    
  }

}
