import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer } from './schemas/manufacturer.schema';

@Controller('manufacturers')
export class ManufacturersController {
  private readonly logger = new Logger('ManufacturersController', {
    timestamp: true,
  });

  constructor(private manufacturersService: ManufacturersService) {}

  @Get()
  getManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturersService.getManufacturers();
  }

  @Get(':id')
  getManufacturer(@Param('id') id: string): Promise<Manufacturer> {
    return this.manufacturersService.getManufacturerById(id);
  }

  @Post()
  createManufacturer(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturersService.createManufacturer(createManufacturerDto);
  }

  @Patch(':id')
  updateManufacturer(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    return this.manufacturersService.updateManufacturer(
      id,
      updateManufacturerDto,
    );
  }

  @Delete(':id')
  deleteManufacturer(@Param('id') id: string) {
    return this.manufacturersService.deleteManufacturer(id);
  }

  @Put(':id/approve')
  approveManufacturer(@Param('id') id: string): Promise<Manufacturer> {
    return this.manufacturersService.approveManufacturer(id);
  }
}
