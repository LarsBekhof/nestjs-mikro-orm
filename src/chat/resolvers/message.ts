import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Subscription } from '@nestjs/graphql';
import { EntityRepository } from 'mikro-orm';
import { InjectRepository } from 'nestjs-mikro-orm';
import { PubSub } from 'graphql-subscriptions';

import { GqlGuard, CurrentUserId } from '../../graphql'
import { User } from '../../user';

import { Message } from '../entities/message';
import { CreateMessageRequest } from '../requests/create-message';

@Resolver(_of => Message)
export class MessageResolver {
    private readonly pubSub = new PubSub();

    constructor(
        @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
        @InjectRepository(Message) private readonly messageRepo: EntityRepository<Message>,
    ) {}

    @UseGuards(GqlGuard)
    @Mutation(_returns => Message)
    async createMessage(@CurrentUserId() userId: number, @Args('input') input: CreateMessageRequest) {
        const user = await this.userRepo.findOne(userId);
        const message = new Message({ ...input, user });

        await this.messageRepo.persistAndFlush(message);

        await this.pubSub.publish('messageCreated', { messageCreated: message });

        return message;
    }

    @Subscription(_returns => Message)
    messageCreated() {
        return this.pubSub.asyncIterator('messageCreated');
    }
}