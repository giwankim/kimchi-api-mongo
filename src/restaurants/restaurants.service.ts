import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly configService: ConfigService,
  ) {}

  getRestaurants(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findOne({ id }).exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant ID "${id}" not found`);
    }
    return restaurant;
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = new this.restaurantModel({
      ...createRestaurantDto,
      version: this.configService.get('VERSION'),
    });
    return restaurant.save();
  }
}
