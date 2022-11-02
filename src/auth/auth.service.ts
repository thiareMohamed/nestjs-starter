import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from 'src/config/exception/exceptions';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Tokens } from './dto/token.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email }, { secret: 'at-secret', expiresIn: 60 * 15 }),
            this.jwtService.signAsync({ sub: userId, email }, { secret: 'rt-secret', expiresIn: 60 * 60 * 24 * 7 }),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async login(user: User): Promise<Tokens> {
        const checkUser = await this.userService.findByEmail(user.email);
        if (!checkUser) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(user.password, checkUser.password)) {
            throw new BadRequestException('Password is incorrect');
        }

        return this.getTokens(checkUser.id, checkUser.email);
    }

    async register() {
        // ...
    }

    async logout() {
        // ...
    }

    async refresh() {
        // ...
    }

}

