import { Entity, IdEntity, PrimaryKey, Property } from 'mikro-orm';

@Entity()
export class User implements IdEntity<User> {
	constructor(data?) {
		Object.assign(this, data);
	}

	@PrimaryKey()
	id!: number;

	@Property()
	createdAt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Property({ unique: true })
	email: string;

	@Property()
	password: string;

	@Property()
	name: string;
}
