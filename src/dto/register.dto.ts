import { IsEmail, IsNotEmpty } from 'class-validator';

import { LoginDTO } from 'src/dto/login.dto';

export class RegisterDTO extends LoginDTO {
  name?: string;
  address?: string;
}
