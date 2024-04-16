import { InjectRedis } from '@app/decorators/redis.decorator'
import { CacheOptions, CacheOptionsFactory, CacheStoreSetOptions } from '@nestjs/cache-manager'
import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public set(key: string, value: string, ttl?: number) {}
}
