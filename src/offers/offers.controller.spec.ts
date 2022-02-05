import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { Offer } from '../database/schemas/offer.schema';

describe('OffersController', () => {
  let controller: OffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        { 
          provide: getModelToken(Offer.name), 
          useValue: Model
        },
        OffersService,
        CaslAbilityFactory
      ]
    }).compile();

    controller = module.get<OffersController>(OffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
