import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './schemas/offer.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema },])],
    exports: [MongooseModule]
})
export class DatabaseModule {}
