import { Controller, Post } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService
    ) { }
    
    @Post()
    create() {
        return this.offersService.create();
    }
}
