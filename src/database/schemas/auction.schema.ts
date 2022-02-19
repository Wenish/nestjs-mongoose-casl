import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Offer, OfferType } from './offer.schema';


export type AuctionDocument = Auction & Document;

@Schema()
export class Auction extends Offer {
    @Prop({ required: true, index: true })
    startBid: number
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);

AuctionSchema.index({"createdAt": -1});
AuctionSchema.index({"updatedAt": -1});
