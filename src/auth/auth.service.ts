import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  register(createUserDto: Prisma.UserCreateInput) {
    throw new Error('Method not implemented.');
  }
}
