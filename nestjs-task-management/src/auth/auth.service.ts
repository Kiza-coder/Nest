import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async deleteUser(id: number) : Promise<void> {
        this.userRepository.delete(id);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accesToken: string}> {
        
        const username =  await this.userRepository.validatePassword(authCredentialsDto)
        

        if(!username)
        {

            throw new UnauthorizedException('Invalid Crendentials');
        }

        const payload: JwtPayload = {username};
        const accesToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT TOKEN with payload ${JSON.stringify(payload)}`)

        return {accesToken};

    }
}
