import { Controller, Req, Sse } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, RmqContext } from '@nestjs/microservices';
import { Request } from 'express'
import { Observable } from 'rxjs';
@Controller()
export class AppController {

  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    return `Hello ${name}`;
  }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello ${name} Async`;
  }

  @EventPattern('book-created')
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
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