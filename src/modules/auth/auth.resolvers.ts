import { User } from '@src/models/user.models';
import { Context } from '@src/types';
import { AuthError, getUser } from '@src/utils';
import * as bcrypt from 'bcryptjs';
import { GraphQLResolveInfo } from 'graphql';
import {
	Args,
	Authorized,
	Ctx,
	FieldResolver,
	Info,
	Mutation,
	Query,
	Resolver,
	ResolverInterface,
	Root
} from 'type-graphql';
import { LoginArgs, SignupArgs } from './auth.args';
import { createUserToPrisma, generateToken } from './auth.services';
import { AuthPayload } from './auth.types';
// tslint:disable:max-classes-per-file

@Resolver()
export class AuthResolver {
	@Authorized()
	@Query(returns => User, {
		description: 'Get current User from Authorization header.'
	})
	public async currentUser(@Ctx() ctx: Context) {
		return await getUser(ctx);
	}

	@Mutation(returns => AuthPayload)
	public async login(
		@Args() args: LoginArgs,
		@Ctx() ctx: Context
	): Promise<AuthPayload> {
		const user = await ctx.db.query.user({ where: { email: args.email } });
		const valid = await bcrypt.compare(args.password, user ? user.password : '');

		if (!valid || !user) {
			throw new AuthError();
		}

		return {
			token: generateToken(user),
			user
		};
	}

	@Mutation(returns => AuthPayload)
	public async signup(
		@Args() args: SignupArgs,
		@Ctx() ctx: Context
	): Promise<AuthPayload> {
		const user = await createUserToPrisma(ctx.db, args);
		return {
			token: generateToken(user),
			user
		};
	}
}

@Resolver(of => AuthPayload)
export class AuthPayloadResolver implements ResolverInterface<AuthPayload> {
	@FieldResolver(returns => User)
	public async user(
		@Root() parent: AuthPayload,
		@Ctx() ctx: Context,
		@Info() info: GraphQLResolveInfo
	): Promise<User> {
		if (parent.user.id) {
			const user = await ctx.db.query.user({ where: { id: parent.user.id } }, info);
			return user || parent.user;
		}
		return parent.user;
	}
}
