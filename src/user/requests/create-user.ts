import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserRequest {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}