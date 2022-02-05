import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Offer,
  OfferDocument,
  OfferStatus,
} from '../database/schemas/offer.schema';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>,
  ) {}

  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<
        Ability<[Action, InferSubjects<typeof this.offerModel> | 'all']>
      >,
    );

    can(Action.Read, this.offerModel, {
      publishDate: { $lte: new Date() },
      status: { $in: [OfferStatus.Approved] },
    });

    can(Action.Create, this.offerModel);

    if (user) {
      if (user?.uid) {
        can(Action.Manage, this.offerModel, { creator: user.uid });
      }

      const userRoles: Role[] = user?.roles || [];

      if (userRoles.includes(Role.CONTENT_MANAGER)) {
        can(Action.Manage, this.offerModel);
      }

      if (userRoles.includes(Role.SYSTEM_ADMIN)) {
        can(Action.Manage, 'all');
      }
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (object) => {
        return object.constructor as ExtractSubjectType<
          InferSubjects<typeof this.offerModel> | 'all'
        >;
      },
    });
  }
}

export enum Role {
  CONTENT_MANAGER = 'ContentManager',
  SYSTEM_ADMIN = 'SystemAdmin',
}
