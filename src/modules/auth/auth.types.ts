import { User } from '@model/user.models';
import { MutationValidationError } from '@src/types';
import { Field, ObjectType } from 'type-graphql';
// tslint:disable:max-classes-per-file

@ObjectType()
export class AuthPayload {
	@Field()
	public token: string;

	@Field()
	public user: User;
}

@ObjectType()
export class AuthPayloadWithError {
	@Field({ nullable: true })
	public payload?: AuthPayload;

	@Field({ nullable: true })
	public error?: MutationValidationError;
}
