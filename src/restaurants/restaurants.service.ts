import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetRestaurantFilterDto } from './dto/get-restaurants-filter.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
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
      this.logger.error(
        `Failed to find restaurant #${id}. ID: ${id}`,
        error.stack,
      );
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

  async updateRestaurant(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    this.logger.verbose(
      `Updating restaurant #${id}. DATA: ${JSON.stringify(
        updateRestaurantDto,
      )}`,
    );
    const restaurant = await this.restaurantModel
      .findOneAndUpdate({ id }, { $set: updateRestaurantDto }, { new: true })
      .exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant #"${id}" not found`);
    }
    return restaurant;
  }

  async deleteRestaurant(id: string) {
    const result = await this.restaurantModel.deleteOne({ id });
    if (result.deletedCount === 0) {
      this.logger.error(`Failed to find restaurant #${id}`);
      throw new NotFoundException(`Restaurant #"${id}" not found`);
    }
  }
}
