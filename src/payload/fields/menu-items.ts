import type { Field, GroupField } from 'payload'
import deepMerge from '@/payload/utils/deepMerge'

import { ContentItemsIconOptions } from '@/payload/fields/content-items-icons'

// Types
export type TMenuLinkType = 'nolink' | 'folder' | 'pages' | 'docs' | 'external'

export type TMenuLinkBase = {
	type: TMenuLinkType
	label?: string
}

export type TMenuLinkWithIcon = TMenuLinkBase & {
	icon?: string
}

export type TMenuLinkWithTarget = TMenuLinkBase & {
	pages?: string
	docs?: string
	url?: string
}

export type TParentMenuLink = TMenuLinkWithIcon &
	TMenuLinkWithTarget & {
		menuChildLinks?: TChildMenuLink[]
	}

export type TChildMenuLink = TMenuLinkWithTarget

export type TMenuLinkFieldConfig = {
	disableLabel?: boolean
	disableIcon?: boolean
	disableChildren?: boolean
	overrides?: Partial<GroupField>
}

// Options
export const menuLinkTypeOptions: { label: string; value: TMenuLinkType }[] = [
	{
		label: 'Label',
		value: 'nolink',
	},
	{
		label: 'Folder',
		value: 'folder',
	},
	{
		label: 'Pages',
		value: 'pages',
	},
	{
		label: 'Docs',
		value: 'docs',
	},
	{
		label: 'External link',
		value: 'external',
	},
]

// Field Creators
/**
 * Creates the base link type fields (pages, docs, external URL)
 */
export const createLinkTypeFields = (): Field[] => [
	{
		name: 'docs',
		type: 'relationship',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'docs',
		},
		label: 'Document to link to',
		relationTo: ['docs'],
		required: true,
	},
	{
		name: 'pages',
		type: 'relationship',
		label: 'Page to link to',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'pages',
		},
		relationTo: ['pages'],
		required: true,
	},
	{
		name: 'url',
		type: 'text',
		admin: {
			condition: (_, siblingData) => siblingData?.type === 'external',
		},
		label: 'External URL',
		required: true,
	},
]

/**
 * Creates the type selector field
 */
export const createTypeSelectorField = (): Field => ({
	name: 'type',
	type: 'radio',
	admin: {
		layout: 'horizontal',
		width: '50%',
	},
	defaultValue: 'pages',
	options: menuLinkTypeOptions,
})

export const createTypeSelectorFieldArray = (): Field[] => {
	return [
		{
			name: 'type',
			type: 'radio',
			admin: {
				layout: 'horizontal',
				width: '50%',
				//hidden: true,
			},
			options: menuLinkTypeOptions,
		},
		{
			name: 'typePages',
			type: 'ui',
			admin: {
				components: {
					Field: {
						path: 'src/payload/fields/custom-radio.tsx',
						exportName: 'CustomRadioFieldClient',
					},
				},
			},
		},
	]
}

/**
 * Creates the icon selector field
 */
export const createIconField = (): Field => ({
	name: 'icon',
	type: 'select',
	admin: {
		width: '10%',
		condition: (_, siblingData) => siblingData?.type === 'pages' || siblingData?.type === 'folder',
	},
	options: ContentItemsIconOptions,
})

/**
 * Creates the label field
 */
export const createLabelField = (): Field => ({
	name: 'label',
	type: 'text',
	admin: {
		width: '50%',
	},
	label: 'Label',
	required: true,
})

/**
 * Base menu link field factory
 */
export const createBaseMenuLink = (config: TMenuLinkFieldConfig = {}): GroupField => {
	const { disableLabel = false, disableIcon = false, overrides = {} } = config

	const linkResult: GroupField = {
		name: 'link',
		label: '', // Leave empty so it's not shown
		type: 'group',
		admin: {
			hideGutter: true,
		},
		fields: [
			{
				type: 'row',
				//fields: [createTypeSelectorField()],
				fields: createTypeSelectorFieldArray(),
			},
		],
	}

	const linkTypeFields = createLinkTypeFields()

	if (!disableLabel) {
		// Add label and icon fields if not disabled
		const additionalFields: Field[] = []

		if (!disableIcon) {
			additionalFields.push(createIconField())
		}

		additionalFields.push(createLabelField())

		linkResult.fields.push({
			type: 'row',
			fields: [...additionalFields, ...linkTypeFields],
		})
	} else {
		// Add link type fields directly
		linkResult.fields = [...linkResult.fields, ...linkTypeFields]
	}

	return deepMerge(linkResult, overrides)
}

/**
 * Creates a parent menu link with children support
 */
export const createParentMenuLink = (config: TMenuLinkFieldConfig = {}): GroupField => {
	const { disableChildren = false, overrides = {} } = config

	const baseLink = createBaseMenuLink({
		...config,
		disableLabel: false, // Parent links always have labels
		disableIcon: false, // Parent links always have icons
	})

	if (!disableChildren) {
		// Add child links support using the specialized child menu link
		const childLinksField: Field = {
			name: 'menuChildLinks',
			type: 'array',
			label: 'Menu Child Links',
			admin: {
				components: {
					RowLabel: {
						path: 'src/payload/components/menu-labels.ts',
						exportName: 'MenuLinkChildLabel',
					},
				},
			},
			fields: [createChildMenuLink()],
		}

		baseLink.fields.push({
			type: 'group',
			admin: {
				hideGutter: true,
			},
			fields: [childLinksField],
		})
	}

	return deepMerge(baseLink, overrides)
}

/**
 * Creates a child menu link (simplified version without children)
 * Only allows: pages, docs, external - no folders or nolink
 */
export const createChildMenuLink = (config: TMenuLinkFieldConfig = {}): GroupField => {
	const { overrides = {} } = config

	// Child links only support pages, docs, and external - no folders or nolink
	const childLinkTypeOptions = menuLinkTypeOptions.filter(
		(option) => option.value === 'pages' || option.value === 'docs' || option.value === 'external',
	)

	const childTypeSelectorField: Field = {
		name: 'type',
		type: 'radio',
		admin: {
			layout: 'horizontal',
			width: '50%',
		},
		defaultValue: 'pages',
		options: childLinkTypeOptions,
	}

	// Child links can have icons for pages
	const childIconField: Field = {
		name: 'icon',
		type: 'select',
		admin: {
			width: '10%',
			condition: (_, siblingData) => siblingData?.type === 'pages', // Only show for pages
		},
		options: ContentItemsIconOptions,
	}

	const childLabelField: Field = {
		name: 'label',
		type: 'text',
		admin: {
			width: '50%',
		},
		label: 'Label',
		required: true,
	}

	const childLinkResult: GroupField = {
		name: 'link',
		label: '', // Leave empty so it's not shown
		type: 'group',
		admin: {
			hideGutter: true,
		},
		fields: [
			{
				type: 'row',
				fields: [childTypeSelectorField],
			},
			{
				type: 'row',
				fields: [childIconField, childLabelField, ...createLinkTypeFields()],
			},
		],
	}

	return deepMerge(childLinkResult, overrides)
}

// Legacy compatibility
type TMenuLink = (options?: { disableLabel?: boolean; overrides?: Partial<GroupField> }) => Field

/**
 * @deprecated Use createParentMenuLink or createChildMenuLink instead
 * This function is kept for backward compatibility
 */
export const menuLink: TMenuLink = ({ disableLabel = false, overrides = {} } = {}) => {
	const config: TMenuLinkFieldConfig = {
		disableLabel,
		disableChildren: disableLabel, // If no label, assume no children
		overrides,
	}

	return createParentMenuLink(config)
}
