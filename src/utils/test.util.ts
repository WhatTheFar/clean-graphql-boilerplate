import { User, UserData } from '@models/user/user.models';
import { createUserToPrisma } from '@models/user/user.repository';
import { SignupArgs } from '@modules/auth/auth.args';
import { AuthService } from '@modules/auth/auth.services';
import { UserWhereUniqueInput } from '@src/generated/prisma';
import { Prisma } from '@src/generated/prisma';
import { graphqlServer, server } from '@src/server';
import { plainToClass } from 'class-transformer';
import * as request from 'supertest';

interface Variables {
	[key: string]: any;
}

export const mockUserArgs: SignupArgs = {
	email: 'jakpat.m@gmail.com',
	password: 'password123',
	firstName: 'John',
	lastName: 'Doe'
};

export const requestGql = (query: any, variables?: Variables) => {
	const body = JSON.stringify({
		query,
		variables
	});

	return request(server)
		.post(graphqlServer.options.endpoint || '/')
		.set('Content-Type', 'application/json')
		.send(body);
};

export const createTestUserIfNotExist = async (args: SignupArgs, prisma: Prisma) => {
	if (!(await prisma.exists.User({ email: args.email }))) {
		await createUserToPrisma(args, prisma);
	}
};

export const getUserBearerToken = async (
	userWhereUniqueInput: UserWhereUniqueInput,
	prisma: Prisma
) => {
	const user = (await prisma.query.user({ where: userWhereUniqueInput })) as UserData;
	return `Bearer ${AuthService.generateToken(plainToClass(User, user))}`;
};

export const deleteTestUserIfExists = async (
	userWhereUniqueInput: UserWhereUniqueInput,
	prisma: Prisma
) => {
	if (await prisma.exists.User(userWhereUniqueInput)) {
		await prisma.mutation.deleteUser({ where: userWhereUniqueInput });
	}
};
