import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateMessageRequest {
    @Field()
    text: string;
}