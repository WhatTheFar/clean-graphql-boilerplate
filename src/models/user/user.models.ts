import { User as UserData } from '@generated/prisma';
import { Field, ID, ObjectType } from 'type-graphql';

export { User as UserData } from '@generated/prisma';

@ObjectType()
export class User implements Partial<UserData> {
	@Field(type => ID)
	public id: string;

	@Field()
	public email: string;

	public password: string;

	@Field()
	public firstName: string;

	@Field()
	public lastName: string;

	public createdAt: Date;

	public updatedAt: Date;
}
