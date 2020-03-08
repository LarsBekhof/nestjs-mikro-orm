import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

const { ENVIRONMENT } = process.env;

@Module({
    imports: [
        GraphQLModule.forRoot({
            debug: ENVIRONMENT === 'development',
            playground: ENVIRONMENT === 'development',
            autoSchemaFile: true,
        }),
    ],
})
export class GqlModule {}