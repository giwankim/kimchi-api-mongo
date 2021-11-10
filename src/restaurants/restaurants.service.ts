import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resourceLimits } from 'worker_threads';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetRestaurantFilterDto } from './dto/get-restaurants-filter.dto';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger('RestaurantsService', {
    timestamp: true,
  });

  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly configService: ConfigService,
  ) {}

  getRestaurants(filterDto: GetRestaurantFilterDto): Promise<Restaurant[]> {
    try {
      return this.restaurantModel.find().exec();
    } catch (error) {
      this.logger.error(
        `Failed to get restaurants. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    try {
      return await this.restaurantModel.findOne({ id }).exec();
    } catch (error) {
      this.logger.error(`Failed to get restaurant. ID: ${id}`, error.stack);
      throw new InternalServerErrorException(error);
    }
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    try {
      const restaurant = new this.restaurantModel({
        ...createRestaurantDto,
        version: this.configService.get('VERSION'),
      });
      return restaurant.save();
    } catch (error) {
      this.logger.error(
        `Failed to create restaurant. Data: ${JSON.stringify(
          createRestaurantDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException(error);
    }
  }

  async deleteRestaurant(id: string) {
    try {
      const result = await this.restaurantModel.deleteOne({ id });
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Restaurant with ID "${id}" not found`);
      }
    } catch (error) {
      this.logger.error(`Failed to delete restaurant. ID: {$id}`, error.stack);
      throw new InternalServerErrorException(error);
    }
  }
}
