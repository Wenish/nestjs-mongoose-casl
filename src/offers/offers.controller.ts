import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { Offer } from './schemas/offer.schema';

@Controller('offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService
    ) { }

    @Post()
    @ApiResponse({ type: Offer })
    create() {
        return this.offersService.create();
    }

    @Get()
    @ApiResponse({ type: Offer, isArray: true })
    readAll() {
        return this.offersService.findAll();
    }

    @Get(':id')
    @ApiResponse({ type: Offer })
    read(@Param('id') id: string) {
        return this.offersService.findOne(id);
    }

    @Patch(':id')
    @ApiResponse({ type: Offer })
    update(@Param('id') id: string) {
        return this.offersService.update(id)
    }

    @Delete(':id')
    @ApiResponse({ type: Offer })
    delete(@Param('id') id: string) {
        return this.offersService.delete(id);
    }
}
