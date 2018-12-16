import { prisma } from '@src/configs/prisma.config';
import { useContainer } from 'type-graphql';
import { Container } from 'typedi';

const TYPES = {
	Prisma: 'prisma'
};

useContainer(Container);

Container.set(TYPES.Prisma, prisma);

export { TYPES, Container };
