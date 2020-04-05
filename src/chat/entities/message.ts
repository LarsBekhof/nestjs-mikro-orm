import { Entity, IdEntity, PrimaryKey, Property, ManyToOne } from 'mikro-orm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from '../../user';

@ObjectType()
@Entity()
export class Message implements IdEntity<Message> {
	constructor(data?) {
		Object.assign(this, data);
	}

	@Field(_type => ID)
	@PrimaryKey()
	id!: number;

	@Field(_type => Date)
	@Property()
	createdAt = new Date();

	@Field(_type => Date)
	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Field()
	@Property()
	text: string;

    @Field(_type => User)
	@ManyToOne(_type => User)
	user: User;
}
