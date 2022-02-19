import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auction, AuctionSchema } from './schemas/auction.schema';
import { Offer, OfferDocument, OfferSchema } from './schemas/offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema }
    ]),
  ],
  providers: [
    {
      provide: getModelToken(Auction.name),
      useFactory: (offerModel: Model<OfferDocument>) => offerModel.discriminator(Auction.name, AuctionSchema),
      inject: [getModelToken(Offer.name)]
     }
  ],
  exports: [MongooseModule, getModelToken(Auction.name)],
})
export class DatabaseModule {}
