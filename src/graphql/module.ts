import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt';

const { ENVIRONMENT } = process.env;

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: ENVIRONMENT === 'development',
            playground: ENVIRONMENT === 'development',
            autoSchemaFile: true,
            context: ({ req }) => ({ req }),
            installSubscriptionHandlers: true,
        }),
		PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [JwtStrategy],
})
export class GqlModule {}