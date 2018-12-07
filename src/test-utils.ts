import { SignupArgs } from '@module/auth/auth.args';
import { createUserToPrisma, generateToken } from '@module/auth/auth.services';
import { User, UserWhereUniqueInput } from '@src/generated/prisma';
import { db } from '@src/server';
import { graphqlServer, server } from '@src/server';
import * as request from 'supertest';

interface IVariables {
	[key: string]: any;
}

export const mockUserArgs: SignupArgs = {
	email: 'jakpat.m@gmail.com',
	password: 'password123',
	firstName: 'John',
	lastName: 'Doe'
};

export const requestGql = (query: any, variables?: IVariables) => {
	const body = JSON.stringify({
		query,
		variables
	});

	return request(server)
		.post(graphqlServer.options.endpoint || '/')
		.set('Content-Type', 'application/json')
		.send(body);
};

export const createTestUserIfNotExist = async (args: SignupArgs) => {
	if (!(await db.exists.User({ email: args.email }))) {
		await createUserToPrisma(db, args);
	}
};

export const getUserBearerToken = async (userWhereUniqueInput: UserWhereUniqueInput) => {
	const user = (await db.query.user({ where: userWhereUniqueInput })) as User;
	return `Bearer ${generateToken(user)}`;
};

export const deleteTestUserIfExists = async (
	userWhereUniqueInput: UserWhereUniqueInput
) => {
	if (await db.exists.User(userWhereUniqueInput)) {
		await db.mutation.deleteUser({ where: userWhereUniqueInput });
	}
};
