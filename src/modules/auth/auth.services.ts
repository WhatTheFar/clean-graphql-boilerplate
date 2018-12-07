import { Prisma } from '@src/generated/prisma';
import { User } from '@src/models/user.models';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignupArgs } from './auth.args';

export const generateToken = (user: User): string =>
	jwt.sign({ userId: user.id }, process.env.APP_SECRET || 'jwt_secret');

export const createUserToPrisma = async (prisma: Prisma, args: SignupArgs) => {
	const password = await bcrypt.hash(args.password, 10);
	const user = await prisma.mutation.createUser({
		data: {
			...args,
			password
		}
	});
	return user;
};
