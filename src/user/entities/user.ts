import { Entity, IdEntity, PrimaryKey, Property } from 'mikro-orm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User implements IdEntity<User> {
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
	@Property({ unique: true })
	email: string;

	@Property()
	password: string;

	@Field()
	@Property()
	name: string;
}
