import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  status(): string {
    return 'App Running...';
  }
}
