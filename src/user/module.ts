import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { User } from './entities/user';

import { UserResolver } from './resolvers/user';
import { AuthResolver } from './resolvers/auth';

const { JWT_SECRET } = process.env;

const MikroOrmRepositories = MikroOrmModule.forFeature({
	entities: [
		User,
	],
})

@Module({
	imports: [
		JwtModule.register({
			secret: JWT_SECRET,
			signOptions: { expiresIn: '7d' },
		}),
		MikroOrmRepositories,
	],
	providers: [
		UserResolver,
		AuthResolver,
	],
	exports: [
		MikroOrmRepositories,
	],
})
export class UserModule {}
