import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy,ExtractJwt} from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secret'),
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const {username} = payload;
        const user = await this.userRepository.findOne({username})

        if(!user)
        {
            throw new UnauthorizedException()
        }
        return user
    }
}