import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersController } from './manufacturers.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Manufacturer,
  ManufacturerSchema,
} from './schemas/manufacturer.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Manufacturer.name, schema: ManufacturerSchema },
    ]),
  ],
  providers: [ManufacturersService],
  controllers: [ManufacturersController],
})
export class ManufacturersModule {}
