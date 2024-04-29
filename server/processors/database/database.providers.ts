import { config } from '@app/config'
import logger from '@app/utils/logger'
import { connection, disconnect, connect, set } from 'mongoose'
import { DB_CONNECTION_TOKEN } from '@app/constants/database.constant'

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
      let reconnectionTask: any = null
      const RECONNECT_INTERVAL = 6000
      set('strictQuery', true)

      function dbConnect() {
        logger.info('dbUrl:', config.dbUrl)
        return connect(config.dbUrl)
      }

      connection.on('disconnected', () => {
        logger.error(`数据库失去连接！尝试 ${RECONNECT_INTERVAL / 1000}s 后重连`)

        reconnectionTask = setTimeout(dbConnect, RECONNECT_INTERVAL)
      })

      connection.on('open', () => {
        logger.info('mongodb数据库连接成功')

        clearTimeout(reconnectionTask)
        reconnectionTask = null
      })

      connection.on('error', (error) => {
        logger.error('数据库连接异常', error)

        disconnect()
      })

      return dbConnect()
    },
    inject: [],
  },
]
