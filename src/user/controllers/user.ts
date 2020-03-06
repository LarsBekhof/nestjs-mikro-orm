import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository } from 'mikro-orm';

import { User } from '../entities/user';

@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    ) { }

    @Get()
    index() {
        return this.userRepo.findAll();
    }

    @Get(':id')
    show(@Param() id) {
        return this.userRepo.findOne(id);
    }

    @Post()
    store(@Body() data) {
        this.userRepo.persistAndFlush(new User(data));
    }

    @Put()
    async update(@Body() data) {
        const user = await this.userRepo.findOne(data.id);
        Object.assign(user, data);
        this.userRepo.persistAndFlush(user);
    }

    @Delete(':id')
    async delete(@Param() id) {
        const user = await this.userRepo.findOne(id);
        this.userRepo.removeAndFlush(user);
    }
}