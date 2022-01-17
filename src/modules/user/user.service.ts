import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDTO } from '../../dto/user/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/user/login.dto';
import { UpdateDTO } from 'src/dto/user/update.dto';
import { Payload } from 'src/types/payload';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(RegisterDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Invalid credentials!', HttpStatus.BAD_REQUEST);
    }
  }

  getAllUsers = async (): Promise<User[]> => await this.userModel.find().exec();

  update = async (id: string, updateDTO: UpdateDTO): Promise<User> =>
    await this.userModel.findByIdAndUpdate(id, updateDTO).exec();

  delete = async (id: string): Promise<User> =>
    await this.userModel.findByIdAndDelete(id).exec();

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
