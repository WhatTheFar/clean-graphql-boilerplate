import 'reflect-metadata';

import { Prisma } from '@src/generated/prisma';
import { permissions } from '@src/permissions';
import { getUser } from '@src/utils';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GraphQLServer, Options } from 'graphql-yoga';
import { yupMiddleware } from 'graphql-yup-middleware';
import { resolve } from 'path';
import { extractFragmentReplacements } from 'prisma-binding';
import {
	AuthChecker,
	buildSchemaSync,
	formatArgumentValidationError
} from 'type-graphql';
import { Context } from './types';

export const db = new Prisma({
	// fragmentReplacements: extractFragmentReplacements(resolvers),
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	debug: process.env.NODE_ENV === 'development'
});

export const options: Options = { formatError: formatArgumentValidationError };

const customAuthChecker: AuthChecker<Context> = async (
	{ root, args, context, info },
	roles
) => {
	const user = await getUser(context);
	if (user) {
		return true;
	}
	return false;
};

export const createGraphQLServer = () => {
	const schema = buildSchemaSync({
		resolvers: [resolve(__dirname, '**', '*', '*.resolvers.ts')],
		emitSchemaFile: resolve(__dirname, 'generated', 'schema.graphql'),
		authChecker: customAuthChecker
	});
	return new GraphQLServer({
		schema,
		context: req => {
			return { ...req, db };
		},
		middlewares: [yupMiddleware()],
		// middlewares: [permissions, yupMiddleware(), ...middlewares],
		resolverValidationOptions: {
			requireResolversForResolveType: false
		}
	});
};

export const createServer = () => createGraphQLServer().createHttpServer(options);

export const graphqlServer = createGraphQLServer();

export const server = graphqlServer.createHttpServer(options);
