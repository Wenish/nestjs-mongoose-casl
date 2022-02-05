import { Test, TestingModule } from '@nestjs/testing';
import { model } from 'mongoose';
import { Offer, OfferSchema, OfferStatus } from '../offers/schemas/offer.schema';
import { Action, CaslAbilityFactory } from './casl-ability.factory';
import * as Chance from 'chance';

describe('CaslAbilityFactory', () => {
  const chance = new Chance();
  let caslAbilityFactory: CaslAbilityFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaslAbilityFactory
      ]
    }).compile();

    caslAbilityFactory = module.get<CaslAbilityFactory>(CaslAbilityFactory);
  });

  it('should be defined', () => {
    expect(caslAbilityFactory).toBeDefined();
  });

  it('user should be able to read offers', () => {
    const user = {}
    const ability = caslAbilityFactory.createForUser(user)
    const canReadOffers = ability.can(Action.Read, Offer)
    expect(canReadOffers).toBeTruthy()
  })

  it('user should be able to create offers', () => {
    const user = {}
    const ability = caslAbilityFactory.createForUser(user)
    const canCreateOffers = ability.can(Action.Create, Offer)
    expect(canCreateOffers).toBeTruthy()
  })

  it('offer should be "Offer"', () => {
    const OfferModel = model<Offer>(Offer.name, OfferSchema);
    const offer = new OfferModel({
      title: chance.word(),
      price: chance.integer({ min: 10, max: 1000 }),
      creator: chance.integer({ min: 1, max: 3 }),
      status: OfferStatus.Approved
    })
    // @ts-ignore
    expect(offer.constructor.modelName).toBe('Offer')
  })

  it('user should be able to read specific offer', () => {
    const OfferModel = model<Offer>(Offer.name, OfferSchema);
    const user = {}
    const offer = new OfferModel({
      title: chance.word(),
      price: chance.integer({ min: 10, max: 1000 }),
      creator: chance.integer({ min: 1, max: 3 }),
      status: OfferStatus.Approved
    })
    const ability = caslAbilityFactory.createForUser(user)
    const canReadOffer = ability.can(Action.Read, offer)
    expect(canReadOffer).toBeTruthy()
  })
});
