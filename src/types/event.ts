import { Document, ObjectId } from 'mongoose';
import { User } from './user';

export interface Event extends Document {
  _id: ObjectId;
  title: string;
  time: Date;
  creator: User;
  members?: User[];
  location?: string;
  description?: string;
}
