import { NestSessionOptions } from 'nestjs-session'
import { RedisService } from './redis.service'
import { SESSION } from '@app/config'
import RedisStore from 'connect-redis'

export const sessionProvider = {
  useFactory: async (redisService: RedisService): Promise<NestSessionOptions> => {
    let redisStore = new RedisStore({
      client: redisService.client,
      prefix: SESSION.sid,
    })
    return {
      session: {
        store: redisStore,
        ...SESSION,
      },
    }
  },
  inject: [RedisService],
}
