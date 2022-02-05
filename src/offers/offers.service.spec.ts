import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { OffersService } from './offers.service';
import { Offer } from '../database/schemas/offer.schema';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        { 
          provide: getModelToken(Offer.name), 
          useValue: Model
        }
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
