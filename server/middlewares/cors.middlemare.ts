import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware, HttpStatus, RequestMethod } from '@nestjs/common'
import { isDevEnv } from '@app/app.env'
import { CROSS_DOMAIN } from '@app/config'
import { createLogger } from '@app/utils/logger'

const logger = createLogger({ scope: 'CorsMiddleware', time: isDevEnv })

/**
 * 跨域配置设置
 * @export
 * @class CorsMiddleware
 * @implements {NestMiddleware}
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, response: Response, next: NextFunction) {
    const getMethod = (method) => RequestMethod[method]
    const origins = req.headers.origin
    const origin = (Array.isArray(origins) ? origins[0] : origins) || ''
    const allowedOrigins = CROSS_DOMAIN.allowedOrigins

    const allowedMethods = [
      RequestMethod.GET,
      RequestMethod.HEAD,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.POST,
      RequestMethod.DELETE,
    ]
    const allowedHeaders = [
      'Authorization',
      'Origin',
      'No-Cache',
      'X-Requested-With',
      'If-Modified-Since',
      'Pragma',
      'Last-Modified',
      'Cache-Control',
      'Expires',
      'Content-Type',
      'X-E4M-With',
    ]
    // Allow Origin 允许本地运行为*
    if (!origin || allowedOrigins.includes(origin) || isDevEnv) {
      response.setHeader('Access-Control-Allow-Origin', origin || '*')
    }
    // Headers
    response.setHeader('Timing-Allow-Origin', '*')
    response.header('Access-Control-Allow-Credentials', 'true')
    response.header('Access-Control-Allow-Headers', allowedHeaders.join(','))
    response.header('Access-Control-Allow-Methods', allowedMethods.map(getMethod).join(','))
    response.header('Access-Control-Max-Age', '1728000')
    response.header('Content-Type', 'application/json; charset=utf-8')

    response.on('finish', () => {
      const statusCode = response.statusCode
      const statusMessage = HttpStatus[statusCode]
      logger.info(`Response Code: ${statusCode} - ${statusMessage}`)
    })

    if (req.method === getMethod(RequestMethod.OPTIONS)) {
      return response.sendStatus(HttpStatus.NO_CONTENT)
    } else {
      return next()
    }
  }
}
