# Executed by yarn
rm -rf dist
yarn gen-datamodel
graphql codegen
tsc -p tsconfig.build.json
echo # Copying graphql schema
mkdir -p ./dist/generated
cp ./src/generated/schema.graphql ./dist/generated/schema.graphql