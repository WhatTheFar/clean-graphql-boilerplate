import { prisma } from '@src/configs/prisma.config';
import { UserWhereUniqueInput } from '@src/generated/prisma';
import { deleteTestUserIfExists, requestGql } from '@utils/test.util';
import { createTestUserIfNotExist, mockUserArgs } from '@utils/test.util';
import * as _ from 'lodash';
import { LoginArgs, SignupArgs } from './auth.args';
import { loginGql, signupGql } from './auth.gql';

const email = 'auth.test@gmail.com';
const password = 'password123';
const userWhereUniqueInput: UserWhereUniqueInput = {
	email
};
const argsSignup: SignupArgs = {
	...mockUserArgs,
	email,
	password
};
const argsLogin: LoginArgs = {
	email,
	password
};

describe('signup resolver', () => {
	beforeEach(async () => {
		await deleteTestUserIfExists(userWhereUniqueInput, prisma);
	});

	test('should return token', async () => {
		expect.assertions(1);

		await requestGql(signupGql, argsSignup).expect(res => {
			expect(res.body).toHaveProperty('data.signup.token');
		});
	});
});

describe('login resolver', () => {
	beforeEach(async () => {
		await createTestUserIfNotExist(argsSignup, prisma);
	});

	test('should return token', async () => {
		await requestGql(loginGql, argsLogin).expect(res => {
			expect(res.body).toHaveProperty('data.login.token');
		});
	});
});
