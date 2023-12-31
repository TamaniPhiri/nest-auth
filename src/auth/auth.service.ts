import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
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
