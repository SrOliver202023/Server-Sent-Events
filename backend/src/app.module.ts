import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq.module';
import { SseController } from './sse.controller';
import { ApiController } from './api.controller';

@Module({
  imports: [ConfigModule.forRoot(), RabbitmqModule],
  controllers: [SseController, ApiController],
})
export class AppModule {}
