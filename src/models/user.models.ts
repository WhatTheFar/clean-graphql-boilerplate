import { User as UserData } from '@src/generated/prisma';
import { Field, ID, ObjectType } from 'type-graphql';
import { OmitStrict } from './../types';

type UserType = OmitStrict<UserData, 'password' | 'createdAt' | 'updatedAt'>;

@ObjectType()
export class User implements UserType {
	@Field(type => ID)
	public id: string;

	@Field()
	public email: string;

	@Field()
	public firstName: string;

	@Field()
	public lastName: string;

}
