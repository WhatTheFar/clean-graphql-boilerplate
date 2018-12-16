import { User } from '@models';
import { UserRepository } from '@models';
import { AuthError } from '@utils';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Inject, Service } from 'typedi';
import { LoginArgs, SignupArgs } from './auth.args';

const comparePassword = (password: string, hashedPassword: string) =>
	bcrypt.compare(password, hashedPassword);

@Service()
export class AuthService {
	public static generateToken(user: User): string {
		return jwt.sign({ userId: user.id }, process.env.APP_SECRET || 'jwt_secret');
	}

	@Inject()
	private readonly userRepository: UserRepository;

	public async signupUser(args: SignupArgs): Promise<User> {
		return await this.userRepository.createUser(args);
	}

	public async loginUser(args: LoginArgs) {
		const user = await this.userRepository.getUser({ email: args.email });
		if (user) {
			const isValid = await comparePassword(args.password, user.password);
			if (isValid) {
				return user;
			}
		}
		throw new AuthError();
	}
}
