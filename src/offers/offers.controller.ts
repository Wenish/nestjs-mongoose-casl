import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

    @Get()
    readAll() {
        return this.offersService.findAll();
    }

    @Get(':id')
    read(@Param('id') id: string) {
        return this.offersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string) {
        return this.offersService.update(id)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.offersService.delete(id);
    }
}
