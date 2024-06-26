import session from 'express-session'
import { devConfig } from './dev.config'
import { prodConfig } from './prod.config'
import { isProdEnv } from '@app/app.env'

export const config = isProdEnv ? prodConfig : devConfig

export const APP = {
  PORT: 5006,
  DEFAULT_CACHE_TTL: 60 * 60 * 24,
}

export const CROSS_DOMAIN = {
  // 允许访问的域名
  allowedOrigins: [''],
  //
  allowedReferer: '',
}

export const REDIS = {
  host: '127.0.0.1',
  port: 6379,
}

export const COOKIE_KEY = '@get-cookie-basSSxsdasda-rqrqr-bxcbxc12446-fsdfsf-dffas'

// session 配置
export const SESSION: session.SessionOptions = {
  secret: 'sup3rs3cr3t',
  name: 'sid',
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 设置session 过期时间
  },
  rolling: true,
}

export const AUTH = {
  jwtTokenSecret: '',
  expiresIn: 3600 * 24 * 7, // TOKEN过期时间， 目前还没有处理实时更新token
}
