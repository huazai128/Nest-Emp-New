import { Controller, Get, Header, Render, Session } from '@nestjs/common'
import { AppService } from '@app/app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/home')
  @Header('content-type', 'text/html')
  @Render('index')
  renderHome(@Session() session) {
    console.log(session.views, 'session')
    return { data: { name: '华仔' } }
  }

  @Get('/index')
  @Header('content-type', 'text/html')
  @Render('index')
  renderIndex(@Session() session: { views?: number; userInfo: any }) {
    session.views = (session.views || 0) + 1
    session.userInfo = { name: '12', userId: 12 }
    return { data: { name: '华仔' } }
  }
}
