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
    console.log(session.views)
    return { data: { name: '华仔' } }
  }

  @Get('/index')
  @Header('content-type', 'text/html')
  @Render('index')
  renderIndex(@Session() session: { views?: number }) {
    session.views = (session.views || 0) + 1
    return { data: { name: '华仔' } }
  }
}
