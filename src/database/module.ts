import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import mikroOrmConfig from './mikro-orm.config';

@Module({
	imports: [MikroOrmModule.forRoot(mikroOrmConfig)],
})
export class DatabaseModule {}
