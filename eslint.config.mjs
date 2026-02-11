import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
	{
		ignores: [
			'.next/**',
			'out/**',
			'build/**',
			'dist/**',
			'cdk/**',
			'next-env.d.ts',
			'src/payload/payload-types.ts',
			'src/payload/importmap.js',
		],
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			// TypeScript
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^(_|ignore)',
				},
			],

			// Import sorting (autofixable)
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',

			// Accessibility (stricter than next/core-web-vitals defaults)
			'jsx-a11y/anchor-is-valid': 'warn',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/no-static-element-interactions': 'warn',
			'jsx-a11y/no-noninteractive-element-interactions': 'warn',
			'jsx-a11y/label-has-associated-control': 'warn',
			'jsx-a11y/heading-has-content': 'warn',
			'jsx-a11y/no-redundant-roles': 'warn',
		},
	},
	{
		files: ['**/*.test.ts', '**/*.test.tsx', 'src/test/**'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
]

export default eslintConfig
