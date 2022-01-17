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
import { BaseEventDTO } from 'src/dto/event/base.dto';
import { MongooseClassSerializerInterceptor } from '../../interceptors/mongooseClassSerializer.interceptor';
import { EventService } from './event.service';

@Controller('event')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(MongooseClassSerializerInterceptor)
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async create(@Body() baseEventDTO: BaseEventDTO) {
    await this.eventService.create();
  }
}
