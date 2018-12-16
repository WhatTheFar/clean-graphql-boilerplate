import { Prisma } from '@src/generated/prisma';

export const prisma = new Prisma({
	// fragmentReplacements: extractFragmentReplacements(resolvers),
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	debug: process.env.NODE_ENV === 'development'
});
