import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [AuthModule, PrismaModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
