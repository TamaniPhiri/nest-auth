import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginDto';
import { ResetPasswordDto } from './dto/resetPasswordDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('reset-password')
  @HttpCode(200)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('new-password')
  @HttpCode(200)
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }

  @Delete('delete')
  deleteUser() {
    return 'User deleted';
  }
}
