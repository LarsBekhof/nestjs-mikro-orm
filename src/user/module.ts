import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { User } from './entities/user';

import { UserController } from './controllers/user';

@Module({
	imports: [
		MikroOrmModule.forFeature({
			entities: [
				User,
			],
		})
	],
	controllers: [
		UserController,
	],
})
export class UserModule {}
