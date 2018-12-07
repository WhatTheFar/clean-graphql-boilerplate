import { Authorized, Query, Resolver } from 'type-graphql';

@Resolver()
export class PingResolver {
	@Query()
	public ping(): string {
		return 'pong';
	}

	@Authorized()
	@Query()
	public pingAuthenticated(): string {
		return 'pong';
	}
}
