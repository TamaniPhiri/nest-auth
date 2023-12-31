import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (user) throw new ConflictException('user already exists');
  }
  constructor(private readonly prismaService: PrismaService) {}
  register(createUserDto: Prisma.UserCreateInput) {
    const { email, password, username } = createUserDto;
    return this.prismaService.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }
}
