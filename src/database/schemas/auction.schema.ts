import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Offer } from './offer.schema';


export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
    @Prop({ required: true, index: true })
    startBid: number
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
