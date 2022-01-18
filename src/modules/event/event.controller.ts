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
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { BaseEventDTO } from 'src/dto/event/base.dto';
import { MongooseClassSerializerInterceptor } from '../../interceptors/mongooseClassSerializer.interceptor';
import { EventService } from './event.service';
import { Event } from 'src/models/event.schema';

@Controller('event')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(MongooseClassSerializerInterceptor)
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async create(@Body() baseEventDTO: BaseEventDTO, @Req() req: any) {
    return await this.eventService.create(baseEventDTO, req.user);
  }

  @Get('all')
  async getAllEvents() {
    return await this.eventService.getAllEvents();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.eventService.delete(id);
  }
}
