import { InferSubjects, Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Offer, OfferStatus } from "../offers/schemas/offer.schema";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subjects = InferSubjects<typeof Offer, true> | 'Offer' | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: any) {
        const { can, cannot, build } = new AbilityBuilder(Ability);

        can(Action.Read, Offer, {
            publishDate: { $lte: new Date() },
            status: { $in: [OfferStatus.Approved] },
        });

        can(Action.Create, Offer);

        if (user) {
            if (user?.uid) {
                can(Action.Manage, Offer, { creator: user.uid });
            }

            const userRoles: Role[] = user?.roles || [];

            if (userRoles.includes(Role.CONTENT_MANAGER)) {
                can(Action.Manage, Offer);
            }

            if (userRoles.includes(Role.SYSTEM_ADMIN)) {
                can(Action.Manage, 'all');
            }
        }

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: item => {
                console.log(item.constructor) // Model { Offer }
                console.log(item.constructor.name) // model
                // @ts-ignore
                const modelName = item.constructor?.modelName
                console.log(modelName)
                return item.constructor as ExtractSubjectType<Subjects>
            }
        });
    }
}

export enum Role {
    CONTENT_MANAGER = 'ContentManager',
    SYSTEM_ADMIN = 'SystemAdmin',
}