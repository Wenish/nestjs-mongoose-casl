import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { OffersModule } from './offers/offers.module';
import { CaslModule } from './casl/casl.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb.uri'),
        dbName: configService.get<string>('database.mongodb.name')
      }),
      inject: [ConfigService],
    }),
    OffersModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
