import { mapUserDataToUser, User } from '@src/models';
import { Context } from '@src/types';
import { getUser } from '@src/utils';
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
import { Inject, Service } from 'typedi';
import { LoginArgs, SignupArgs } from './auth.args';
import { AuthService } from './auth.services';
import { AuthPayload } from './auth.types';
// tslint:disable:max-classes-per-file

@Service()
@Resolver()
export class AuthResolver {
	@Inject()
	private readonly authService: AuthService;

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
		const user = await this.authService.loginUser(args);

		const token = AuthService.generateToken(user);

		return {
			token,
			user
		};
	}

	@Mutation(returns => AuthPayload)
	public async signup(
		@Args() args: SignupArgs,
		@Ctx() ctx: Context
	): Promise<AuthPayload> {
		const user = await this.authService.signupUser(args);
		const token = AuthService.generateToken(user);

		return {
			token,
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
			return user ? mapUserDataToUser(user) : parent.user;
		}
		return parent.user;
	}
}
