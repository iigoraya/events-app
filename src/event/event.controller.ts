import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { MongooseClassSerializerInterceptor } from '../helpers/mongooseClassSerializer.interceptor';
import { EventService } from './event.service';

@Controller('event')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(MongooseClassSerializerInterceptor)
export class EventController {
  constructor(private eventService: EventService) {}
}
