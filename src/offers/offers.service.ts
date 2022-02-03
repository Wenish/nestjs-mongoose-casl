import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './schemas/offer.schema';
import * as Chance from 'chance';


@Injectable()
export class OffersService {
    constructor(
        @InjectModel(Offer.name)
        private offerModel: Model<OfferDocument>,
    ) { }

    async create() {
        const chance = new Chance();
        const offerToCreate = new this.offerModel({
            title: chance.word(),
            price: chance.integer({ min: 10, max: 1000 }),
            creator: chance.integer({ min: 1, max: 3 })
        });

        if(chance.bool()) {
            offerToCreate.publishDate = chance.date();
        }


        return offerToCreate.save()
    }
}
