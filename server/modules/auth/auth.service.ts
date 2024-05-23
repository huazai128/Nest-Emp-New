import { Injectable } from '@nestjs/common'
import { AUTH } from '@app/config'
import { JwtService } from '@nestjs/jwt'
import { AuthDTO } from './auth.dto'
import { InjectModel } from '@app/transforms/model.transform'
import { MongooseID, MongooseModel } from '@app/interfaces/mongoose.interface'
import { decodeBase64, decodeMd5 } from '@app/utils/util'
import { Auth } from './auth.model'
import { LoginInfo, TokenInfo } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) private authModel: MongooseModel<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 生成token
   * @param {*} data
   * @return {*}  {TokenInfo}
   * @memberof AuthService
   */
  creatToken(data): TokenInfo {
    const token = {
      access_token: this.jwtService.sign({ data }),
      expires_in: AUTH.expiresIn as number,
    }
    return token
  }

  /**
   * 验证用户
   * @param {any} { userId }
   * @return {*}
   * @memberof AuthService
   */
  public async validateUser({ userId }: any) {
    return await this.getFindUserId(userId)
  }

  /**
   * 根据userId 查找用户信息
   * @param {number} userId
   * @return {*}
   * @memberof AuthService
   */
  public async getFindUserId(userId: number) {
    return await this.authModel.findOne({ userId: userId }).exec()
  }

  /**
   * login
   * @param {AuthDTO} auth
   * @return {*}  {Promise<LoginInfo>}
   * @memberof AuthService
   */
  public async login(auth: AuthDTO): Promise<LoginInfo> {
    const existAuth = await this.authModel.findOne({ account: auth.account }, '+password')
    const password = decodeMd5(decodeBase64(auth.password))
    if (existAuth?.password !== password) {
      throw 'account error'
    }
    // 如果针对平台限制每人只能登录一次。需要加上平台信息
    const token = this.creatToken({ account: existAuth.account, userId: existAuth.userId })
    return { ...token, account: existAuth.account, userId: existAuth.userId }
  }

  /**
   * 根据ID查询用户
   * @param {MongooseID} id
   * @return {*}  {(Promise<Auth | null>)}
   * @memberof AuthService
   */
  public async findById(id: MongooseID): Promise<Auth | null> {
    const userInfo = await this.authModel.findById(id)
    return userInfo
  }

  /**
   * 新建账号
   * @param {AuthDTO} auth
   * @return {*}
   * @memberof AuthService
   */
  public async createUser(auth: AuthDTO) {
    const newPassword = decodeMd5(decodeBase64(auth.password))
    const existedAuth = await this.authModel.findOne({ account: auth.account }).exec()
    if (existedAuth) {
      throw '账户已存在'
    }
    return await this.authModel.create({ account: auth.account, password: newPassword })
  }
}
