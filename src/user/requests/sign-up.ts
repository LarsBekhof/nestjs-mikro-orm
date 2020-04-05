import { InputType, Field } from 'type-graphql';

@InputType()
export class SignUpRequest {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}