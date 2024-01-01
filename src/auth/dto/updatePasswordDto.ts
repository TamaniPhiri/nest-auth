import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  readonly password: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly otp: string;
}
