import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { Cuisine } from '../enums/cuisine.enum';
import { KimchiType } from '../enums/kimchi-type.enum';
import { Restaurant } from '../schemas/restaurant.schema';

export class CreateRestaurantDto {
  @IsEnum(KimchiType)
  type_of_kimchi: KimchiType;

  @IsString()
  manufacturer: string;

  @IsPositive()
  consumption_amount: number;

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

  @IsPositive()
  area: number;

  @IsEnum(Cuisine)
  cuisine: Cuisine;

  toEntity(): Restaurant {
    const restaurant = new Restaurant();
    restaurant.type_of_kimchi = this.type_of_kimchi;
    restaurant.manufacturer = this.manufacturer;
    restaurant.consumption_amount = this.consumption_amount;
    restaurant.province = this.province;
    restaurant.district = this.district;
    restaurant.address = this.address;
    restaurant.address_detail = this.address_detail;
    restaurant.postal_code = this.postal_code;
    restaurant.name = this.name;
    restaurant.area = this.area;
    restaurant.cuisine = this.cuisine;
    return restaurant;
  }
}
