import 'reflect-metadata';

import '@configs/typedi.config';

import { prisma } from '@configs/prisma.config';
import { getUser } from '@utils';
import { GraphQLServer, Options } from 'graphql-yoga';
import { resolve } from 'path';
import {
	AuthChecker,
	buildSchemaSync,
	formatArgumentValidationError
} from 'type-graphql';
import { Context } from './types';

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

const resovlersPath = resolve(__dirname, '**', '*', '*.resolvers.ts');
const emitSchemaFilePath = resolve(__dirname, 'generated', 'schema.graphql');

export const createGraphQLServer = () => {
	const schema = buildSchemaSync({
		resolvers: [resovlersPath],
		emitSchemaFile: emitSchemaFilePath,
		authChecker: customAuthChecker,
		dateScalarMode: 'isoDate'
	});

	return new GraphQLServer({
		schema,
		context: req => {
			return { ...req, db: prisma };
		},
		resolverValidationOptions: {
			requireResolversForResolveType: false
		}
	});
};

export const createServer = () => createGraphQLServer().createHttpServer(options);

export const graphqlServer = createGraphQLServer();

export const server = graphqlServer.createHttpServer(options);
