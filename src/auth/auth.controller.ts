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
import { RegisterDTO } from 'src/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { UpdateDTO } from 'src/dto/update.dto';
import { MongooseClassSerializerInterceptor } from '../helpers/mongooseClassSerializer.interceptor';

@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/users')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateDTO: UpdateDTO) {
    return await this.userService.update(id, updateDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
