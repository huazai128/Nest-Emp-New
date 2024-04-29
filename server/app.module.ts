import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'

// middlewares
import { CorsMiddleware } from './middlewares/cors.middlemare'
import { OriginMiddleware } from './middlewares/origin.middlemare'
import { RedisCoreModule } from './processors/redis/redis.module'
import { retryStrategy } from './processors/redis/redis.util'
import { DatabaseModule } from './processors/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    RedisCoreModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
      options: {
        retryStrategy: retryStrategy,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*')
  }
}
