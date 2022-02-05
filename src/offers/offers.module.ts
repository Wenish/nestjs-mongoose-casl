import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { CaslModule } from '../casl/casl.module';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        DatabaseModule,
        CaslModule
    ],
    controllers: [OffersController],
    providers: [OffersService]
})
export class OffersModule { }
