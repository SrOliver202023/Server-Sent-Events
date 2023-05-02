import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, interval, map, pipe } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('publish/:idChannel')
  async publish(@Body() body: object, @Param() param: { idChannel: string }) {
    return await this.appService.publish(param.idChannel, body)
  }

  @Sse('sse/:idChannel')
  async subscribe(@Param() param: { idChannel: string }): Promise<Observable<any>> {
    return await this.appService.subscribe(param.idChannel)
  }
}
