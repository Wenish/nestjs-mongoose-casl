import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './schemas/offer.schema';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { CaslModule } from 'src/casl/casl.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema},]),
        CaslModule
    ],
    controllers: [OffersController],
    providers: [OffersService]
})
export class OffersModule { }
