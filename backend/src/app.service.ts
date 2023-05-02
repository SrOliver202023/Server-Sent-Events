import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Observable } from 'rxjs';
import { v4 } from 'uuid'

@Injectable()
export class AppService {
  private redisClone: Redis

  constructor(
    @InjectRedis() private readonly redis: Redis
  ) {
    this.redisClone = this.redis.duplicate()
  }

  async publish(channel: string, payload: any) {
    const newPayload: PubSubPayload = {
      id: v4(),
      date: new Date(),
      payload
    }
    return await this.redis.publish(channel, JSON.stringify(newPayload))
  }

  async subscribe(channel: string) {
    return new Observable((sub) => {
      this.redisClone.subscribe(channel)
      this.redisClone.on('message', (channel, payload: any) => {
        sub.next({ data: payload })
      })
    })
  }
}
