import { IsNotEmpty } from 'class-validator';

export class UpdateDTO {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  address?: string;
}
