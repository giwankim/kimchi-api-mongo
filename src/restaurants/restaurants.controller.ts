import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetRestaurantFilterDto } from './dto/get-restaurants-filter.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  private readonly logger = new Logger('RestaurantsController', {
    timestamp: true,
  });

  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getRestaurants(
    @Body() filterDto: GetRestaurantFilterDto,
  ): Promise<Restaurant[]> {
    this.logger.verbose(
      `Retrieving all restaurants. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.restaurantsService.getRestaurants(filterDto);
  }

  @Get(':id')
  getRestaurantById(@Param('id') id: string): Promise<Restaurant> {
    this.logger.verbose(`Retrieving a restaurant: ID "${id}"`);
    const restaurant = this.restaurantsService.getRestaurantById(id);
    if (!restaurant) {
      this.logger.error(`Restaurant ID "${id}" not found`);
      throw new NotFoundException(`Restaurant ID "${id}" not found`);
    }
    return restaurant;
  }

  @Post()
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    this.logger.verbose(
      `Creating a restaurant. Data: ${JSON.stringify(createRestaurantDto)}`,
    );
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  @Delete(':id')
  deleteRestaurant(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Deleting a restaurant. ID: ${id}`);
    return this.restaurantsService.deleteRestaurant(id);
  }
}
