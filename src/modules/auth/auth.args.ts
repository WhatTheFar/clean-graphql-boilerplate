import { User as UserData } from '@src/generated/prisma';
import { OmitStrict } from '@src/types';
import { IsEmail, Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
// tslint:disable:max-classes-per-file

@ArgsType()
export class LoginArgs implements Pick<UserData, 'email' | 'password'> {
	@Field()
	@IsEmail()
	public email: string;

	@Field()
	@Length(8, 20)
	public password: string;
}

@ArgsType()
export class SignupArgs
	implements OmitStrict<UserData, 'id' | 'createdAt' | 'updatedAt'> {
	@Field()
	@IsEmail()
	public email: string;

	@Field()
	@Length(8, 20)
	public password: string;

	@Field()
	public firstName: string;

	@Field()
	public lastName: string;
}
