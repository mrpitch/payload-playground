'use client'
import { useState } from 'react'
import { RadioGroupField, useField, useFormFields } from '@payloadcms/ui'

import type { RadioFieldClientComponent, RadioFieldClientProps } from 'payload'

// Types
export type TMenuLinkType = 'nolink' | 'folder' | 'pages' | 'docs' | 'external'
export const menuLinkTypeOptions: { label: string; value: TMenuLinkType }[] = [
	{
		label: 'Hurdi',
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

// Define allowed options for each menu type
const menuTypeAllowedOptions: Record<string, TMenuLinkType[]> = {
	mainMenu: ['nolink', 'folder', 'pages'],
	footerMenu: ['nolink', 'external'],
	sidebarMenu: ['folder', 'pages', 'docs'],
}

// Filter base options based on menu type
const getMenuTypeOptions = (menuType: string): { label: string; value: TMenuLinkType }[] => {
	const allowedValues =
		menuTypeAllowedOptions[menuType] || Object.values(menuTypeAllowedOptions).flat()
	return menuLinkTypeOptions.filter((option) => allowedValues.includes(option.value))
}

export const CustomRadioFieldClient: RadioFieldClientComponent = (props: RadioFieldClientProps) => {
	const { path, field } = props
	const { value, setValue } = useField<string>({ path })
	const { value: menuType } = useFormFields(([fields, dispatch]) => fields.menuType)

	// Get filtered options based on menuType
	const filteredOptions = getMenuTypeOptions(menuType as TMenuLinkType)

	console.log('menuType', menuType)
	console.log('filteredOptions', filteredOptions)

	const fieldWithOptions = {
		...field,
		options: filteredOptions,
	}

	return (
		<RadioGroupField
			path={path}
			field={fieldWithOptions}
			value={value}
			onChange={(value: any) => setValue(value)}
		/>
	)
}
