import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { EmailImageTextBlock } from '@payload-types'

export type EmailTemplateType = 'passwordReset' | 'verifyEmail' | 'newsletter'

export interface CommonEmailFields {
	subject: string
	previewText: string
	salutation: string
	footer: DefaultTypedEditorState
	username: string
	email: string
}

export interface PasswordResetFields extends CommonEmailFields {
	heading: string
	copy: string
	buttonLabel: string
	url: string
}

export interface VerifyEmailFields extends CommonEmailFields {
	heading: string
	copy: string
	buttonLabel: string
	url: string
}

export interface NewsletterFields extends CommonEmailFields {
	blocks: EmailImageTextBlock[]
}

export type EmailTemplateFields =
	| { type: 'passwordReset'; fields: PasswordResetFields }
	| { type: 'verifyEmail'; fields: VerifyEmailFields }
	| { type: 'newsletter'; fields: NewsletterFields }

// Utility types for field mapping
export type DefaultEmailValues = Partial<CommonEmailFields> & {
	passwordReset?: Partial<Omit<PasswordResetFields, keyof CommonEmailFields>>
	verifyEmail?: Partial<Omit<VerifyEmailFields, keyof CommonEmailFields>>
	newsletter?: Partial<Omit<NewsletterFields, keyof CommonEmailFields>>
}

export type FieldMapper<T extends EmailTemplateType> = (
	fields: any,
) => T extends 'passwordReset'
	? PasswordResetFields
	: T extends 'verifyEmail'
		? VerifyEmailFields
		: T extends 'newsletter'
			? NewsletterFields
			: never

// Default values for all fields
export const defaultEmailValues: DefaultEmailValues = {
	subject: 'Default Subject',
	previewText: 'Default Preview Text',
	salutation: 'Dear User,',
	username: 'John Doe',
	email: 'john.doe@example.com',
	footer: {
		root: {
			type: 'root',
			version: 1,
			direction: null,
			format: '',
			indent: 0,
			children: [
				{
					children: [
						{
							detail: 0,
							format: 0,
							mode: 'normal',
							style: '',
							text: 'Default Footer',
							type: 'text',
							version: 1,
						},
					],
					direction: null,
					format: '',
					indent: 0,
					type: 'paragraph',
					version: 1,
				},
			],
		},
	},
	passwordReset: {
		heading: 'Reset Your Password',
		copy: 'Click the button below to reset your password.',
		buttonLabel: 'Reset Password',
		url: 'https://example.com/reset-password',
	},
	verifyEmail: {
		heading: 'Verify Your Email',
		copy: 'Click the button below to verify your email address.',
		buttonLabel: 'Verify Email',
		url: 'https://example.com/verify-email',
	},
	newsletter: {
		blocks: [],
	},
}
