import { Injectable } from '@nestjs/common';

@Injectable()
export class BankService {
  getUsers(): string {
    return 'Get users from service';
  }
}