import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './schemas/offer.schema';
import * as Chance from 'chance';


@Injectable()
export class OffersService {
    private chance = new Chance();

    constructor(
        @InjectModel(Offer.name)
        private offerModel: Model<OfferDocument>,
    ) { }

    create() {
        const offerToCreate = new this.offerModel({
            title: this.chance.word(),
            price: this.chance.integer({ min: 10, max: 1000 }),
            creator: this.chance.integer({ min: 1, max: 3 })
        });
        if (this.chance.bool()) {
            offerToCreate.publishDate = this.chance.date();
        }
        return offerToCreate.save()
    }

    update(id: string) {
        return this.offerModel.findByIdAndUpdate(id, { title: this.chance.word(), price: this.chance.integer({ min: 10, max: 1000 }) }, { new: true })
    }

    findAll() {
        return this.offerModel.find().exec();
    }

    findOne(id: string) {
        return this.offerModel.findById(id).exec();
    }

    delete(id: string) {
        return this.offerModel.findByIdAndDelete(id).exec()
    }
}
