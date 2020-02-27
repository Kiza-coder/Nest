import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Controller, Post, Body, UsePipes, ValidationPipe, Delete, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Delete('/:id')
    deleteUserById(@Param('id',ParseIntPipe)id: number): Promise<void> {
        return this.authService.deleteUser(id)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accesToken:string}> {
        return this.authService.signIn(authCredentialsDto);       
    }

   
}
