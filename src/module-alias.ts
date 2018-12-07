import * as moduleAlias from 'module-alias';
import { join } from 'path';

moduleAlias.addAliases({
	'@root': join(__dirname, '..'),
	'@src': __dirname,
	'@module': join(__dirname, 'modules'),
	'@model': join(__dirname, 'models')
});

moduleAlias();
