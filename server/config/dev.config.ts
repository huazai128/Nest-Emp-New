const REDISCONFIG = {
  type: 'single',
  url: 'redis://localhost:6379',
}
const dbUrl = 'mongodb://127.0.0.1:27017/monitor'

export const devConfig = {
  REDISCONFIG,
  dbUrl,
}
