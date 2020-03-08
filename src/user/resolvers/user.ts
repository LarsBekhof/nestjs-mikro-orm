import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';

import { User } from '../entities/user';
import { CreateUserRequest } from '../requests/create-user';
import { UpdateUserRequest } from '../requests/update-user';

@Resolver(_of => User)
export class UserResolver {
    constructor(
        @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    ) { }

    @Query(_returns => [User])
    users() {
        return this.userRepo.findAll();
    }

    @Query(_returns => User)
    user(@Args('id') userId: number) {
        return this.userRepo.findOne(userId);
    }

    @Mutation(_returns => User)
    async createUser(@Args('input') input: CreateUserRequest) {
        const user = new User(input);
        await this.userRepo.persistAndFlush(user);
        return user;
    }

    @Mutation(_returns => User)
    async updateUser(@Args('input') input: UpdateUserRequest) {
        const user = await this.userRepo.findOne(input.id);
        Object.assign(user, input);
        await this.userRepo.persistAndFlush(user);
        return user;
    }

    @Mutation(_return => User)
    async deleteUser(@Args('id') userId: number) {
        const user = await this.userRepo.findOne(userId);
        await this.userRepo.removeAndFlush(user);
        return user;
    }
}