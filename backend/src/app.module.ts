import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: process.env.REDIS_PASSWORD,
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
