import { IsNotEmpty, IsDateString } from 'class-validator';

export class BaseEventDTO {
  @IsNotEmpty()
  title: string;

  @IsDateString()
  time: string;
  
  description?: string;
  location?: string;
  
}
