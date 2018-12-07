module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	// testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@root(.*)$': '<rootDir>$1',
		'^@src(.*)$': '<rootDir>/src$1',
		'^@module(.*)$': '<rootDir>/src/modules$1',
		'^@model(.*)$': '<rootDir>/src/models$1'
	}
};
