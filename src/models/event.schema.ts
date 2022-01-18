import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Transform } from 'class-transformer';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  time: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
  })
  members: User[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  creator: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
