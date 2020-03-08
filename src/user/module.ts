import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { User } from './entities/user';

import { UserResolver } from './resolvers/user';

@Module({
	imports: [
		MikroOrmModule.forFeature({
			entities: [
				User,
			],
		})
	],
	providers: [
		UserResolver,
	]
})
export class UserModule {}
