import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'
import { APP, environment } from '@app/config'
import logger from '@app/utils/logger'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import ejs from 'ejs'
import { getServerIp } from '@app/utils/util'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, '../../dist/client'))
  app.setBaseViewsDir(join(__dirname, '../../dist/views'))

  app.setViewEngine('html')
  app.engine('html', ejs.renderFile)

  await app.listen(APP.PORT).then(() => {
    logger.info(`Application is running on: http://${getServerIp()}:${APP.PORT}, env: ${environment}}`)
  })
}
bootstrap()
