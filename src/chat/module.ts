import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { UserModule } from '../user';

import { Message } from './entities/message';
import { MessageResolver } from './resolvers/message';

const MikroOrmRepositories = MikroOrmModule.forFeature({
	entities: [
		Message,
	],
});

@Module({
	imports: [
		MikroOrmRepositories,
		UserModule,
	],
	providers: [
        MessageResolver,
	]
})
export class ChatModule {}
