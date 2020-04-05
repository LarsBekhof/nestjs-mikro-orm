import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';
import bcrypt from 'bcrypt';

import { User } from '../entities/user';
import { SignInRequest } from '../requests/sign-in';
import { SignUpRequest } from '../requests/sign-up';
import { AccessTokenResponse } from '../requests/access-token';

const SALT_ROUNDS = 8;

@Resolver(_of => User)
export class AuthResolver {
    constructor(
        @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) {}

    @Mutation(_returns => AccessTokenResponse)
    async signIn(@Args('input') input: SignInRequest) {
        const user = await this.userRepo.findOne({ email: input.email });

        if (!bcrypt.compareSync(input.password, user.password)) {
            throw new Error('Incorrect user credentials, please try again');
        }

        return {
            accessToken: this.jwtService.sign({ sub: user.id }),
        };
    }

    @Mutation(_returns => AccessTokenResponse)
    async signUp(@Args('input') input: SignUpRequest) {
        const user = new User(input);

        user.password = bcrypt.hashSync(user.password, SALT_ROUNDS)

        await this.userRepo.persistAndFlush(user);

        return {
            accessToken: this.jwtService.sign({ sub: user.id }),
        };
    }
}