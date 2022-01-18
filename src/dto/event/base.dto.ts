import { IsNotEmpty, IsDateString } from 'class-validator';
import { User } from 'src/types/user';

export class BaseEventDTO {
  @IsNotEmpty()
  title: string;

  @IsDateString()
  time: string;

  description?: string;
  location?: string;
  members?: User[];
}
