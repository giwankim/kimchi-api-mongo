import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { v4 as uuid } from 'uuid';

export type ManufacturerDocument = Manufacturer & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Manufacturer {
  @Exclude()
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true, default: uuid })
  id: string;

  @Prop({ required: true })
  version: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128, required: true })
  daily_production_amount: number;

  @Prop({ required: true })
  certified_all_korean: boolean;

  @Prop({ required: true })
  certified_traditional_food: boolean;

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

  @Prop({ required: true, default: false })
  approved: boolean;

  @Prop()
  @Exclude()
  created_at: Date;

  @Prop()
  @Exclude()
  updated_at: Date;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
