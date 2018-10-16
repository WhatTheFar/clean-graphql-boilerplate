import { writeFileSync } from 'fs';
import { FieldValidationError, MutationValidationError } from 'graphql-yup-middleware';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { join } from 'path';

export const generateTypeDefs = () => {
	const typesArray = fileLoader(join(__dirname, './**/!(generated)/*.graphql'));

	const typeDefs = `
# import * from "prisma.graphql"

${FieldValidationError}
${MutationValidationError}
${mergeTypes(typesArray, { all: true })}
`;

	writeFileSync(join(__dirname, 'generated', 'schema.graphql'), typeDefs);
};
