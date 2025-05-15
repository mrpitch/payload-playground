import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import {
	EmailTemplateType,
	CommonEmailFields,
	PasswordResetFields,
	VerifyEmailFields,
	NewsletterFields,
	defaultEmailValues,
} from '../types/email-templates'

const getCommonFields = (fields: any, type: EmailTemplateType): CommonEmailFields => ({
	subject: fields?.[`${type}.Template.subject`]?.value || defaultEmailValues.subject,
	previewText: fields?.[`${type}.Template.previewText`]?.value || defaultEmailValues.previewText,
	salutation: fields?.[`${type}.Template.salutation`]?.value || defaultEmailValues.salutation,
	footer: fields?.['footer.content']?.value || defaultEmailValues.footer,
	username: fields?.[`${type}.Template.username`]?.value || defaultEmailValues.username,
	email: fields?.[`${type}.Template.email`]?.value || defaultEmailValues.email,
})

export const getPasswordResetFields = (fields: any): PasswordResetFields => ({
	...getCommonFields(fields, 'passwordReset'),
	heading:
		fields?.['passwordReset.Template.heading']?.value || defaultEmailValues.passwordReset?.heading,
	copy: fields?.['passwordReset.Template.copy']?.value || defaultEmailValues.passwordReset?.copy,
	buttonLabel:
		fields?.['passwordReset.Template.buttonLabel']?.value ||
		defaultEmailValues.passwordReset?.buttonLabel,
	url: fields?.['passwordReset.Template.url']?.value || defaultEmailValues.passwordReset?.url,
})

export const getVerifyEmailFields = (fields: any): VerifyEmailFields => ({
	...getCommonFields(fields, 'verifyEmail'),
	heading:
		fields?.['verifyEmail.Template.heading']?.value || defaultEmailValues.verifyEmail?.heading,
	copy: fields?.['verifyEmail.Template.copy']?.value || defaultEmailValues.verifyEmail?.copy,
	buttonLabel:
		fields?.['verifyEmail.Template.buttonLabel']?.value ||
		defaultEmailValues.verifyEmail?.buttonLabel,
	url: fields?.['verifyEmail.Template.url']?.value || defaultEmailValues.verifyEmail?.url,
})

export const getNewsletterFields = (fields: any): NewsletterFields => {
	console.log('Newsletter fields:', fields)
	const blocks = fields?.['content.Template.layout']?.rows || []

	// Transform blocks to include their content
	const transformedBlocks = blocks.map((block: any, index: number) => {
		const blockPath = `content.Template.layout.${index}`
		return {
			...block,
			tagline: fields?.[`${blockPath}.tagline`]?.value || '',
			headline: fields?.[`${blockPath}.headline`]?.value || '',
			copy: fields?.[`${blockPath}.copy`]?.value || '',
			ctaText: fields?.[`${blockPath}.ctaText`]?.value || '',
			ctaLink: fields?.[`${blockPath}.ctaLink`]?.value || '',
			image: fields?.[`${blockPath}.image`]?.value || null,
			type: fields?.[`${blockPath}.type`]?.value || 'image-top',
		}
	})

	console.log('Transformed blocks:', transformedBlocks)

	return {
		...getCommonFields(fields, 'newsletter'),
		blocks: transformedBlocks,
	}
}

export const getEmailFields = (type: EmailTemplateType, fields: any) => {
	switch (type) {
		case 'passwordReset':
			return getPasswordResetFields(fields)
		case 'verifyEmail':
			return getVerifyEmailFields(fields)
		case 'newsletter':
			return getNewsletterFields(fields)
		default:
			throw new Error(`Unknown email template type: ${type}`)
	}
}
