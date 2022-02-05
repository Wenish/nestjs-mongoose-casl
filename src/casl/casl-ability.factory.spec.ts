import { Test, TestingModule } from '@nestjs/testing';
import { Model, model } from 'mongoose';
import { Action, CaslAbilityFactory } from './casl-ability.factory';
import * as Chance from 'chance';
import { getModelToken } from '@nestjs/mongoose';
import { Offer, OfferDocument, OfferStatus } from '../database/schemas/offer.schema';

describe('CaslAbilityFactory', () => {
  const chance = new Chance();
  const mockOffer = {
    title: chance.word(),
    price: chance.integer({ min: 10, max: 1000 }),
    creator: chance.integer({ min: 1, max: 3 }),
    status: OfferStatus.Approved
  };

  let caslAbilityFactory: CaslAbilityFactory;
  let offerModel: Model<OfferDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaslAbilityFactory,
        { 
          provide: getModelToken(Offer.name), 
          useValue: Model
        }
      ]
    }).compile();

    caslAbilityFactory = module.get<CaslAbilityFactory>(CaslAbilityFactory);
    offerModel = module.get<Model<OfferDocument>>(getModelToken(Offer.name));
  });

  it('should be defined', () => {
    expect(caslAbilityFactory).toBeDefined();
  });

  it('user should be able to read offers', () => {
    const user = {}
    const ability = caslAbilityFactory.createForUser(user)
    const canReadOffers = ability.can(Action.Read, offerModel)
    expect(canReadOffers).toBeTruthy()
  })

  it('user should be able to create offers', () => {
    const user = {}
    const ability = caslAbilityFactory.createForUser(user)
    const canCreateOffers = ability.can(Action.Create, offerModel)
    expect(canCreateOffers).toBeTruthy()
  })

  it('user should be able to read specific offer', () => {
    const user = {}
    const offer = new offerModel(mockOffer)
    const ability = caslAbilityFactory.createForUser(user)
    const canReadOffer = ability.can(Action.Read, offer)
    expect(canReadOffer).toBeTruthy()
  })
});
