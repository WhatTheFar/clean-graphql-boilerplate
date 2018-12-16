import { TYPES } from '@configs/typedi.config';
import { Prisma, User as UserData } from '@generated/prisma';
import { UserWhereUniqueInput } from '@generated/prisma';
import { OmitStrict } from '@types';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { GraphQLResolveInfo } from 'graphql';
import { Inject, Service } from 'typedi';
import { User } from './user.models';

export const mapUserDataToUser = (userData: UserData) => {
	return plainToClass(User, userData);
};

export const createUserToPrisma = async (
	args: OmitStrict<UserData, 'id' | 'createdAt' | 'updatedAt'>,
	prisma: Prisma
) => {
	const password = await bcrypt.hash(args.password, 10);
	const userData = await prisma.mutation.createUser({
		data: {
			...args,
			password
		}
	});
	return userData;
};

@Service()
export class UserRepository {
	@Inject(TYPES.Prisma)
	private readonly prisma!: Prisma;

	public async createUser(
		args: OmitStrict<UserData, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<User> {
		const userData = await createUserToPrisma(args, this.prisma);
		return mapUserDataToUser(userData);
	}

	public async getUser(
		where: UserWhereUniqueInput,
		info?: GraphQLResolveInfo
	): Promise<User | null> {
		const userData = await this.prisma.query.user({ where }, info);

		const user = userData ? mapUserDataToUser(userData) : null;
		return user;
	}
}
