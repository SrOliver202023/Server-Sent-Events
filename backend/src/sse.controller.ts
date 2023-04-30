import { Controller, Get, Req, Sse } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Ctx, RmqContext, Transport } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Controller()
export class SseController {
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

  @Sse('sse')
  sse(@Req() req: Request, @Ctx() context: RmqContext) {
    return new Observable((observer) => {
      const intervalId = setInterval(() => {
        observer.next({ data: `${new Date()}` });
      }, 1000);
      req.on('close', () => {
        clearInterval(intervalId)
        observer.complete();
      });
    })
  }
}
