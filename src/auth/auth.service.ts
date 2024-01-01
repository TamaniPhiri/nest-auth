import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, compare } from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import { LoginUserDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import * as speakeasy from 'speakeasy';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: MailerService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (!user) throw new ConflictException('user dont exists');
    const confirmPass = await compare(password, user.password);
    if (!confirmPass) throw new UnauthorizedException('Invalid Password');
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: process.env.JWT_SECRET,
    });
    return {
      username: user.username,
      email: user.email,
      token: token,
    };
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    const { email, password, username } = createUserDto;
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (user) throw new ConflictException('User already exists');
    const hashedPass = await hash(password, 10);
    await this.emailService.sendSignUpConfirmation(email);
    return this.prismaService.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) throw new ConflictException('user dont exists');
    const otp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      digits: 5,
      step: 60 * 15,
      encoding: 'base32',
    });
    const url = 'http://localhost:3000/auth/reset-password-confirmation';
    await this.emailService.sentResetOtp(user.email, url, otp);
    return {
      message: 'Password reset link sent to mail',
    };
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const { email, password, otp } = updatePasswordDto;
  }
}
