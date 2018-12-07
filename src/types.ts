import { Field, ObjectType } from 'type-graphql';
import { Prisma } from './generated/prisma';
// tslint:disable:interface-name
// tslint:disable:max-classes-per-file

export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Context {
	db: Prisma;
	request: any;
}

export interface TokenPayload {
	userId: string;
}

@ObjectType()
export class FieldValidationError {
	@Field()
	public field: string;

	@Field(type => [String])
	public errors: string[];
}

@ObjectType()
export class MutationValidationError {
	@Field()
	public message: string;

	@Field(type => [FieldValidationError])
	public details: FieldValidationError[];
}
