import { prisma } from '@configs/prisma.config';
import { SignupArgs } from '@modules/auth/auth.args';
import { graphqlServer } from '@src/server';
import { getUserBearerToken, mockUserArgs, requestGql } from '@utils/test.util';
import { createTestUserIfNotExist } from '@utils/test.util';
import { graphql } from 'graphql';
import gql from 'graphql-tag';

let token: string;

const email = 'ping.test@gmail.com';
const signupArgs: SignupArgs = {
	...mockUserArgs,
	email
};

beforeAll(async () => {
	await createTestUserIfNotExist(signupArgs, prisma);
	token = await getUserBearerToken({ email }, prisma);
});

test('ping', async () => {
	expect.assertions(1);
	const tag = gql`
		query {
			ping
		}
	`;

	await requestGql(tag).expect(res => {
		expect(res.body.data).toEqual({ ping: 'pong' });
	});
});

test('pingAuthenticated', async () => {
	expect.assertions(1);
	const tag = gql`
		query {
			pingAuthenticated
		}
	`;

	await requestGql(tag)
		.set('Authorization', token)
		.expect(res => {
			expect(res.body.data).toEqual({ pingAuthenticated: 'pong' });
		});
});
