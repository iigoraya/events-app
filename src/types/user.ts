import { Document, ObjectId } from 'mongoose';

export interface User extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  name?: string;
  address?: string;
}
