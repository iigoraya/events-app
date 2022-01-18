import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from 'src/models/event.schema';
import { BaseEventDTO } from 'src/dto/event/base.dto';
import { User } from 'src/types/user';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(eventDto: BaseEventDTO, creator: User): Promise<Event> {
    const event = new this.eventModel({
      ...eventDto,
      creator,
    });
    return event.save();
  }

  getAllEvents = async (): Promise<Event[]> =>
    await this.eventModel.find().populate('members').populate('creator').exec();

  delete = async (id: string): Promise<Event> =>
    await this.eventModel.findByIdAndDelete(id).exec();
}
