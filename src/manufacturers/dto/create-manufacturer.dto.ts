import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateManufacturerDto {
  @IsPositive()
  daily_production_amount: number;

  @IsBoolean()
  certified_all_korean: boolean;

  @IsBoolean()
  certified_traditional_food: boolean;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  address_detail?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
