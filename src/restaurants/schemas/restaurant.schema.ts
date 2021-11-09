import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { Composition } from '../enums/composition.enum';
import { Cuisine } from '../enums/cuisine.enum';
import { KimchiType } from '../enums/kimchi-type.enum';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Restaurant {
  @Exclude()
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true })
  version: string;

  @Prop({ required: true })
  type_of_kimchi: KimchiType;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true, default: Composition.DOMESTICALLY_MANUFACTURED })
  composition: Composition;

  @Prop({ type: mongoose.Schema.Types.Decimal128, required: true })
  consumption_amount: number;

  @Prop()
  province: string;

  @Prop()
  district: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  address_detail: string;

  @Prop()
  postal_code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128, required: true })
  area: number;

  @Prop({ required: true })
  cuisine: Cuisine;

  @Prop({ required: true, default: false })
  approved: boolean;

  @Prop()
  @Exclude()
  created_at: Date;

  @Prop()
  @Exclude()
  updated_at: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
