import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction, AuctionSchema } from './schemas/auction.schema';
import { Offer, OfferDocument, OfferSchema } from './schemas/offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name, schema: OfferSchema, discriminators: [
          {
            name: Auction.name,
            schema: AuctionSchema
          }
        ]
      }
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule { }
