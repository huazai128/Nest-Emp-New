import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'

// middlewares
import { CorsMiddleware } from './middlewares/cors.middlemare'
import { OriginMiddleware } from './middlewares/origin.middlemare'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*')
  }
}
