import '../src/module-alias';
import { initAuth } from './auth/index';

export const initSeed = async () => {
	await initAuth();
};

initSeed();
