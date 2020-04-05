import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AccessTokenResponse {
    @Field()
    accessToken: string;
}