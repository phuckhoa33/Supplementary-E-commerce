import { Controller, Get, Render } from '@nestjs/common';

@Controller('bank')
export class BankController {
  @Get()
  @Render('bank')
  bank(){
    
  }
}