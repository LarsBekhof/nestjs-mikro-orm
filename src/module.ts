import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { GqlModule } from './graphql';
import { UserModule } from './user';
import { ChatModule } from './chat';

@Module({
	imports: [
		DatabaseModule,
		GqlModule,
		UserModule,
		ChatModule,
	],
})
export class AppModule {}
