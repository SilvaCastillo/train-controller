import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.mocha,
			},
		},
		rules: {
			eqeqeq: ['error', 'always'],
			curly: ['error', 'all'],
			'prefer-const': 'error',
			'no-var': 'error',
			'no-shadow': 'warn',
			'consistent-return': 'warn',
			'no-debugger': 'error',
		},
	},
]);
