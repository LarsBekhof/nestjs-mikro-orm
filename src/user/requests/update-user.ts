import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class UpdateUserRequest {
    @Field(_type => ID)
    id: number;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;
}