import { Controller, Get, Req } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Request } from 'express';

@Controller()
export class ApiController {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'sse',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
  @Get('send-sse')
  async sendSse(@Req() req: Request) {
    this.client?.send({ cmd: 'sse' }, 'Hello from RabbitMQ!').toPromise()
  }
}
