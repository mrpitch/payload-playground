'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RadioGroupField, useField, useFormFields } from '@payloadcms/ui'

import type { RadioFieldClientComponent, RadioFieldClientProps } from 'payload'

// Types
export type TMenuLinkType = 'nolink' | 'folder' | 'pages' | 'docs' | 'external'
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

// Define allowed options for each menu type
const menuTypeAllowedOptions: Record<string, TMenuLinkType[]> = {
	mainMenu: ['nolink', 'folder', 'pages'],
	footerMenu: ['nolink', 'folder', 'pages'],
	profileMenu: ['nolink', 'folder', 'pages'],
	dashboardMenu: ['nolink', 'folder', 'pages'],
	docsMenu: ['nolink', 'folder', 'docs'],
}

// Filter base options based on menu type
const getMenuTypeOptions = (menuType: string): { label: string; value: TMenuLinkType }[] => {
	const allowedValues =
		menuTypeAllowedOptions[menuType] || Object.values(menuTypeAllowedOptions).flat()
	return menuLinkTypeOptions.filter((option) => allowedValues.includes(option.value))
}

// Get default value based on menu type
const getDefaultValueForMenuType = (menuType: string): TMenuLinkType => {
	const defaults: Record<string, TMenuLinkType> = {
		mainMenu: 'pages',
		footerMenu: 'pages',
		profileMenu: 'pages',
		dashboardMenu: 'pages',
		docsMenu: 'docs',
	}
	return defaults[menuType] || 'pages'
}

export const CustomRadioFieldClient: RadioFieldClientComponent = (props: RadioFieldClientProps) => {
	const { path, field } = props
	const { value, setValue } = useField<string>({ path })
	const [options, setOptions] = useState<{ label: string; value: TMenuLinkType }[]>([])

	// Only subscribe to menuType changes, not all form fields
	const { value: menuType } = useFormFields(([fields]) => fields.menuType)

	// Memoize the filtered options to prevent unnecessary recalculations
	const filteredOptions = useMemo(() => {
		return getMenuTypeOptions(menuType as string)
	}, [menuType])

	useEffect(() => {
		setOptions(filteredOptions)

		// Set default value if no value is currently set and options are available
		if (!value && filteredOptions.length > 0) {
			const defaultValue = getDefaultValueForMenuType(menuType as string)
			// Make sure the default value is available in the filtered options
			const availableDefault = filteredOptions.find((option) => option.value === defaultValue)
			const finalDefault = availableDefault ? availableDefault.value : filteredOptions[0].value
			setValue(finalDefault)
		}
	}, [filteredOptions, value, setValue, menuType])

	// Memoize the field with options to prevent object recreation
	const fieldWithOptions = useMemo(
		() => ({
			...field,
			options: options,
			defaultValue: options.length > 0 ? getDefaultValueForMenuType(menuType as string) : undefined,
		}),
		[field, options, menuType],
	)

	// Memoize the onChange handler
	const handleChange = useCallback(
		(value: any) => {
			setValue(value)
		},
		[setValue],
	)

	return (
		<RadioGroupField path={path} field={fieldWithOptions} value={value} onChange={handleChange} />
	)
}
