import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';

import { GqlGuard, CurrentUserId } from '../../graphql'

import { User } from '../entities/user';
import { UpdateUserRequest } from '../requests/update-user';
import { PubSub } from 'graphql-subscriptions';

@Resolver(_of => User)
export class UserResolver {
    private readonly pubSub = new PubSub();
    constructor(
        @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    ) {}

    @UseGuards(GqlGuard)
    @Query(_returns => [User])
    users() {
        return this.userRepo.findAll();
    }

    @UseGuards(GqlGuard)
    @Query(_returns => User)
    currentUser(@CurrentUserId() userId: number) {
        return this.userRepo.findOne(userId);
    }

    @UseGuards(GqlGuard)
    @Query(_returns => User)
    user(@Args('id') userId: number) {
        return this.userRepo.findOne(userId);
    }

    @UseGuards(GqlGuard)
    @Mutation(_returns => User)
    async updateUser(@Args('input') input: UpdateUserRequest) {
        const user = await this.userRepo.findOne(input.id);
        Object.assign(user, input);
        await this.userRepo.persistAndFlush(user);
        return user;
    }

    @UseGuards(GqlGuard)
    @Mutation(_return => User)
    async deleteUser(@Args('id') userId: number) {
        const user = await this.userRepo.findOne(userId);
        await this.userRepo.removeAndFlush(user);
        return user;
    }
}