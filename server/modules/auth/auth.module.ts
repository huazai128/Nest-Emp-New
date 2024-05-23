import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { AUTH } from '@app/config'
import { AuthProvider } from './auth.model'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: AUTH.jwtTokenSecret,
      signOptions: {
        expiresIn: AUTH.expiresIn as number,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
