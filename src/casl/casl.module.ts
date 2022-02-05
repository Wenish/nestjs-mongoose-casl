import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  imports: [DatabaseModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}