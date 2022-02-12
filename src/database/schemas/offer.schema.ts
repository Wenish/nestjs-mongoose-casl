import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export enum OfferStatus {
  Created = 'Created',
  Approved = 'Approved',
  Declined = 'Declined',
  Archived = 'Archived',
}

export type OfferDocument = Offer & Document;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  toJSON: {
    virtuals: true,
  },
})
export class Offer {
  @ApiProperty()
  id: string;

  @Prop({ required: true, index: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  price: number;

  @Prop({ default: OfferStatus.Created, enum: OfferStatus, required: true })
  @ApiProperty()
  status: OfferStatus;

  @Prop({ default: Date.now })
  @ApiProperty()
  publishDate: Date;

  @Prop({ required: true })
  @ApiProperty()
  creator: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
