import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/module';
import { GqlModule } from './graphql/module';
import { UserModule } from './user/module';

@Module({
	imports: [
		DatabaseModule,
		GqlModule,
		UserModule,
	],
})
export class AppModule {}
