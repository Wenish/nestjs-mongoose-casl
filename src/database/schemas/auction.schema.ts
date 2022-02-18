import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Offer } from './offer.schema';


export type AuctionDocument = Auction & Document;

@Schema({
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: {
      virtuals: true,
    },
  })
export class Auction extends Offer {
    @Prop({ required: true, index: true })
    startBid: number
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);

AuctionSchema.index({"createdAt": -1});
AuctionSchema.index({"updatedAt": -1});
