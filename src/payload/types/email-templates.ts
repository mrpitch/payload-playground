import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { EmailImageTextBlock } from '@payload-types'

export type TEmailTemplateType = 'passwordReset' | 'verifyEmail' | 'newsletter'

export interface TCommonEmailProps {
	subject: string
	previewText: string
	salutation: string
	footer: DefaultTypedEditorState
}

export interface TPasswordResetProps extends TCommonEmailProps {
	heading: string
	copy: string
	buttonLabel: string
	url: string
}

export interface TVerifyEmailProps extends TCommonEmailProps {
	heading: string
	copy: string
	buttonLabel: string
	url: string
}

export interface TNewsletterProps extends TCommonEmailProps {
	layout: EmailImageTextBlock[]
}

export type TEmailTemplateProps =
	| { type: 'passwordReset'; props: TPasswordResetProps }
	| { type: 'verifyEmail'; props: TVerifyEmailProps }
	| { type: 'newsletter'; props: TNewsletterProps }

// Utility types for field mapping
export type TDefaultEmailValues = Partial<TCommonEmailProps> & {
	passwordReset?: Partial<Omit<TPasswordResetProps, keyof TCommonEmailProps>>
	verifyEmail?: Partial<Omit<TVerifyEmailProps, keyof TCommonEmailProps>>
	newsletter?: Partial<Omit<TNewsletterProps, keyof TCommonEmailProps>>
}

export type TPropsMapper<T extends TEmailTemplateType> = (
	props: TPasswordResetProps | TVerifyEmailProps | TNewsletterProps,
) => T extends 'passwordReset'
	? TPasswordResetProps
	: T extends 'verifyEmail'
		? TVerifyEmailProps
		: T extends 'newsletter'
			? TNewsletterProps
			: never

// Default values for all fields
export const defaultEmailValues: TDefaultEmailValues = {
	subject: 'Default Subject',
	previewText: 'Default Preview Text',
	salutation: 'Dear User,',
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
		layout: [],
	},
}
