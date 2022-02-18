import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './schemas/auction.schema';
import { Offer, OfferSchema } from './schemas/offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema, collection: Offer.name.toLocaleLowerCase() + 's' },
      {
        name: Auction.name, schema: AuctionSchema, collection: Offer.name.toLocaleLowerCase() + 's'
      }
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
