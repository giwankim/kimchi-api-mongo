import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        const database = configService.get('DB_DATABASE');

        return {
          uri: `mongodb://${username}:${password}@${host}:${port}`,
          dbName: `${database}`,
        };
      },
    }),
    // MongooseModule.forRoot('mongodb://localhost/kimchi', {
    //   useUnifiedTopology: true,
    // }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
