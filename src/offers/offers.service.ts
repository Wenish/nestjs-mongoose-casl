import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Callback, Model } from 'mongoose';
import { Offer, OfferDocument, OfferStatus } from '../database/schemas/offer.schema';
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
        offerToCreate.status = this.chance.bool() ? OfferStatus.Created : OfferStatus.Approved;
        return offerToCreate.save()
    }

    update(id: string) {
        const newStatus = this.chance.bool() ? OfferStatus.Approved : OfferStatus.Archived;
        return this.offerModel.findByIdAndUpdate(id, { title: this.chance.word(), price: this.chance.integer({ min: 10, max: 1000 }), status: newStatus }, { new: true })
    }

    findAll(query) {
        this.offerModel.find()
        return this.offerModel.find(query).exec();
    }

    findOne(id: string) {
        return this.offerModel.findById(id).exec();
    }

    delete(id: string) {
        return this.offerModel.findByIdAndDelete(id).exec()
    }
}
