import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Action, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { OffersService } from './offers.service';
import { Offer, OfferDocument } from '../database/schemas/offer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { toMongoQuery } from '@casl/mongoose';

@Controller('offers')
export class OffersController {
  constructor(
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>,
    private readonly offersService: OffersService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @ApiResponse({ type: Offer })
  create() {
    const user = {};
    const ability = this.caslAbilityFactory.createForUser(user);
    const canCreateOffers = ability.can(Action.Create, this.offerModel);
    console.log(this.timeString(), 'can create offer', canCreateOffers);

    if (!canCreateOffers) throw new UnauthorizedException();

    return this.offersService.create();
  }

  @Get()
  @ApiResponse({ type: Offer, isArray: true })
  async readAll() {
    const user = {
      uid: '3',
      // roles: ['SystemAdmin']
    };
    const ability = this.caslAbilityFactory.createForUser(user);
    const canReadOffers = ability.can(Action.Read, this.offerModel);
    console.log(this.timeString(), 'can read offers', canReadOffers);

    if (!canReadOffers) throw new UnauthorizedException();

    const query = toMongoQuery(ability, this.offerModel, Action.Read);

    return this.offersService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ type: Offer })
  async read(@Param('id') id: string) {
    const user = {
      uid: '3',
    };
    const ability = this.caslAbilityFactory.createForUser(user);
    const offer = await this.offersService.findOne(id);
    const canReadOffer = ability.can(Action.Read, offer);
    console.log(this.timeString(), 'can read offer', canReadOffer);

    if (!canReadOffer) throw new UnauthorizedException();
    if (!offer) throw new NotFoundException();

    return offer;
  }

  @Patch(':id')
  @ApiResponse({ type: Offer })
  async update(@Param('id') id: string) {
    const user = {
      uid: '3',
    };
    const ability = this.caslAbilityFactory.createForUser(user);
    const offer = await this.offersService.findOne(id);
    const canUpdateOffer = ability.can(Action.Update, offer);
    console.log(this.timeString(), 'can update offer', canUpdateOffer);

    if (!canUpdateOffer) throw new UnauthorizedException();
    if (!offer) throw new NotFoundException();

    return this.offersService.update(id);
  }

  @Delete(':id')
  @ApiResponse({ type: Offer })
  async delete(@Param('id') id: string) {
    const user = {
      uid: '3',
    };
    const ability = this.caslAbilityFactory.createForUser(user);
    const offer = await this.offersService.findOne(id);
    const canDeleteOffer = ability.can(Action.Delete, offer);
    console.log(this.timeString(), 'can delete offer', canDeleteOffer);

    if (!canDeleteOffer) throw new UnauthorizedException();
    if (!offer) throw new NotFoundException();

    return this.offersService.delete(id);
  }

  private timeString() {
    const date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
  }
}
