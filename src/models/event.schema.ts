import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Transform, Type } from 'class-transformer';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  creator: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
  })
  @Type(() => User)
  members: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
