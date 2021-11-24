import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import {
  Manufacturer,
  ManufacturerDocument,
} from './schemas/manufacturer.schema';

@Injectable()
export class ManufacturersService {
  private readonly logger = new Logger('ManufacturersService', {
    timestamp: true,
  });

  constructor(
    @InjectModel(Manufacturer.name)
    private readonly manufacturerModel: Model<ManufacturerDocument>,
    private readonly configService: ConfigService,
  ) {}

  getManufacturers(): Promise<Manufacturer[]> {
    try {
      return this.manufacturerModel.find().exec();
    } catch (error) {
      this.logger.error(`Failed to get manufacturers`, error.stack);
      throw new InternalServerErrorException(error);
    }
  }

  async getManufacturerById(id: string): Promise<Manufacturer> {
    try {
      return await this.manufacturerModel.findOne({ id }).exec();
    } catch (error) {
      this.logger.error(`Failed to find manufacturer #${id}`, error.stack);
      throw new InternalServerErrorException(error);
    }
  }

  createManufacturer(createManufacturerDto: CreateManufacturerDto) {
    const manufacturer = new this.manufacturerModel({
      ...createManufacturerDto,
      version: this.configService.get('VERSION'),
      // certified_all_korean: false,
    });
    return manufacturer.save();
  }

  async updateManufacturer(
    id: string,
    updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerModel.findOneAndUpdate(
      { id },
      { $set: updateManufacturerDto },
      { new: true },
    );
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
    return manufacturer;
  }

  async approveManufacturer(id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerModel.findOneAndUpdate(
      { id },
      { approved: true },
      { new: true },
    );
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
    return manufacturer;
  }

  async deleteManufacturer(id: string): Promise<void> {
    const result = await this.manufacturerModel.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
  }
}
