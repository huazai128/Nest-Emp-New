import { DynamicModule, Module } from '@nestjs/common'
import Redis, { RedisOptions } from 'ioredis'

@Module({})
export class RedisCoreModule {
  // forRoot
  static forRoot(options: RedisOptions, connection?: string): DynamicModule {
    return {
      module: RedisCoreModule,
      providers: [],
      exports: [],
    }
  }

  //
}
