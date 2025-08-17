import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blacklist, BlacklistSchemal } from 'src/schemas/Blacklist.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blacklist.name, schema: BlacklistSchemal }]),
  ],
  controllers: [BlacklistController],
  providers: [BlacklistService],
  exports: [BlacklistService]
})
export class BlacklistModule { }
