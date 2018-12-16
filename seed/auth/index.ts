import { SignupArgs } from '@module/auth/auth.args';
import { signupGql } from '@module/auth/auth.gql';
import { requestGql } from '@src/utils/test';
import { logGraphqlError } from './../utils';

export const seedUserArgs: SignupArgs = {
	email: 'jakpat.m@gmail.com',
	password: 'password123',
	firstName: 'John',
	lastName: 'Doe'
};

export const initAuth = async () => {
	const res = await requestGql(signupGql, seedUserArgs);

	if (res.body.errors) {
		console.log('initAuth error');
		logGraphqlError(res.body.errors);
	}
};
