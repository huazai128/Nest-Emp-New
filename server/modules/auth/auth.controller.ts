import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { Responsor } from '@app/decorators/responsor.decorator'
import { ApiGuard } from '@app/guards/api.guard'
import { AuthDTO } from './auth.dto'
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 登录接口 不需要鉴权
   * @param {Request} req
   * @param {HttpRequest} data
   * @param {Response} res
   * @return {*}
   * @memberof AuthController
   */
  @Post('login')
  @Responsor.api()
  @Responsor.handle('登录')
  public async adminLogin(@Req() req: Request, @Body() data: AuthDTO, @Res() res: Response) {
    const { access_token, ...result } = await this.authService.login(data)
    res.cookie('jwt', access_token, {
      sameSite: true,
      httpOnly: true,
    })
    res.cookie('userId', result.userId)
    // session.user = result
    return res.status(200).send({
      result: result,
      status: 'success',
      message: '登录成功',
    })
  }

  /**
   * 获取用户信息
   * @param {string} id
   * @return {*}
   * @memberof AuthController
   */
  @Get('user')
  @UseGuards(ApiGuard)
  @Responsor.api()
  @Responsor.handle('获取用户信息')
  public async getUserInfo(@Param('id') id: number) {
    // 每次获取用户信息时，可以刷新token，防止token过期。但又不影响接口请求
    return await this.authService.getFindUserId(id)
  }

  /**
   * create account
   * @param {AuthDTO} auth
   * @return {*}
   * @memberof AuthController
   */
  @Post('create')
  @UseGuards(ApiGuard) // 新建必须要有权限，不提供对外
  @Responsor.api()
  @Responsor.handle('create account')
  public async create(@Body() auth: AuthDTO) {
    return this.authService.createUser(auth)
  }
}
