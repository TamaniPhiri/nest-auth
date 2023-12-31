import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/loginDto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  //   async login(loginUserDto: LoginUserDto) {
  //     const { email, password } = loginUserDto;
  //     const user = await this.prismaService.user.findFirst({
  //       where: { email, password },
  //     });
  //     if (user) throw new ConflictException('user dont exists');
  //     await compare(password)
  //   }

  async register(createUserDto: Prisma.UserCreateInput) {
    const { email, password, username } = createUserDto;
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (user) throw new ConflictException('User already exists');
    const hashedPass = await hash(password, 10);
    return this.prismaService.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });
  }
}
