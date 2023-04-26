import { Controller, Get, Req, Logger, Sse } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Ctx, MessagePattern, Payload, RmqContext, RmqRecordBuilder, Transport } from '@nestjs/microservices';
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
  // @Get('sse')
  sse(@Req() req: Request, @Ctx() context: RmqContext) {
    const channel = context?.getChannelRef();
    const originalMsg = context?.getMessage();

    channel.ack('s');

    const message = ':cat:';
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ['x-version']: '1.0.0',
        },
        priority: 3,
      })
      .build();

    this.client.send('replace-emoji', record).subscribe()

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

  // @MessagePattern({ cmd: 'sse' })
  // handleMessage(@Payload() data: any): Observable<any> {
  //   return new Observable((observer) => {
  //     observer.next(`data: ${data}\n\n`);
  //   });
  // }


  // @MessagePattern('notifications')
  // getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {

  // }

}
