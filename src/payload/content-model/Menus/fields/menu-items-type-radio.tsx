'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RadioGroupField, useField } from '@payloadcms/ui'

import type { RadioFieldClientComponent, RadioFieldClientProps } from 'payload'

import {
	TGroupItemType,
	TMenuItemType,
	TFolderItemType,
	groupItemTypeOptions,
	menuItemTypeOptions,
} from './menu-items'

// Define allowed options for each menu type
const menuTypeAllowedOptions: Record<string, TMenuItemType[]> = {
	mainMenu: ['group', 'page'],
	footerMenu: ['group', 'page'],
	profileMenu: ['group', 'page', 'url'],
	dashboardMenu: ['group', 'page', 'url'],
	docsMenu: ['group', 'doc'],
}

const groupItemAllowedOptions: Record<string, TGroupItemType[]> = {
	mainMenu: ['page', 'folder', 'url'],
	footerMenu: ['page', 'url'],
	profileMenu: ['page'],
	dashboardMenu: ['page', 'folder', 'url'],
	docsMenu: ['doc', 'folder'],
}

const folderItemAllowedOptions: Record<string, TFolderItemType[]> = {
	mainMenu: ['page', 'url'],
	footerMenu: ['page', 'url'],
	profileMenu: ['page'],
	dashboardMenu: ['page', 'url'],
	docsMenu: ['doc'],
}

const folderItemTypeOptions: { label: string; value: TFolderItemType }[] = [
	{
		label: 'Page',
		value: 'page',
	},
	{
		label: 'Doc',
		value: 'doc',
	},
]

// Filter base options based on menu type
const getMenuTypeOptions = (menuType: string): { label: string; value: TMenuItemType }[] => {
	const allowedValues =
		menuTypeAllowedOptions[menuType] || Object.values(menuTypeAllowedOptions).flat()
	return menuItemTypeOptions.filter((option) => allowedValues.includes(option.value))
}

const getGroupItemOptions = (groupItemType: string): { label: string; value: TGroupItemType }[] => {
	const allowedValues =
		groupItemAllowedOptions[groupItemType] || Object.values(groupItemAllowedOptions).flat()
	return groupItemTypeOptions.filter((option) => allowedValues.includes(option.value))
}

const getFolderItemOptions = (
	folderItemType: string,
): { label: string; value: TFolderItemType }[] => {
	const allowedValues =
		folderItemAllowedOptions[folderItemType] || Object.values(folderItemAllowedOptions).flat()
	return folderItemTypeOptions.filter((option) => allowedValues.includes(option.value))
}

// Get default value based on menu type
const getDefaultValueForMenuType = (menuType: string): TMenuItemType => {
	const defaults: Record<string, TMenuItemType> = {
		mainMenu: 'page',
		footerMenu: 'group',
		profileMenu: 'group',
		dashboardMenu: 'page',
		docsMenu: 'page',
	}
	return defaults[menuType] || 'page'
}

// Get default value for group item type based on menu type
const getDefaultValueForGroupItemType = (menuType: string): TGroupItemType => {
	const defaults: Record<string, TGroupItemType> = {
		mainMenu: 'page',
		footerMenu: 'page',
		profileMenu: 'page',
		dashboardMenu: 'page',
		docsMenu: 'doc',
	}
	return defaults[menuType] || 'page'
}

// Get default value for folder item type based on menu type
const getDefaultValueForFolderItemType = (menuType: string): TFolderItemType => {
	const defaults: Record<string, TFolderItemType> = {
		mainMenu: 'page',
		footerMenu: 'page',
		profileMenu: 'page',
		dashboardMenu: 'page',
		docsMenu: 'doc',
	}
	return defaults[menuType] || 'page'
}

export const CustomRadioFieldClient: RadioFieldClientComponent = (props: RadioFieldClientProps) => {
	const { path, field } = props
	const { value, setValue } = useField<string>({ path })
	const [options, setOptions] = useState<
		{ label: string; value: TMenuItemType | TGroupItemType | TFolderItemType }[]
	>([])

	// Read the top-level menuType field (single source of truth)
	const { value: menuType } = useField<string>({ path: 'menuType' })

	// Determine if this is a folder item type field based on the field path
	const isFolderItemType = path?.includes('folderItems') || path?.includes('folderItem')

	// Determine if this is a group item type field based on the field path
	// Group detection excludes folder contexts, since folders live under groups
	const isGroupItemType =
		(path?.includes('groupItems') || path?.includes('groupItem')) && !isFolderItemType

	// Memoize the filtered options to prevent unnecessary recalculations
	const filteredOptions = useMemo(() => {
		if (isFolderItemType) return getFolderItemOptions(menuType as string)
		if (isGroupItemType) return getGroupItemOptions(menuType as string)
		return getMenuTypeOptions(menuType as string)
	}, [menuType, isGroupItemType, isFolderItemType])

	useEffect(() => {
		setOptions(filteredOptions)

		// Set default value if no value is currently set and options are available
		if (!value && filteredOptions.length > 0) {
			const defaultValue = isFolderItemType
				? getDefaultValueForFolderItemType(menuType as string)
				: isGroupItemType
					? getDefaultValueForGroupItemType(menuType as string)
					: getDefaultValueForMenuType(menuType as string)
			// Make sure the default value is available in the filtered options
			const availableDefault = filteredOptions.find((option) => option.value === defaultValue)
			const finalDefault = availableDefault ? availableDefault.value : filteredOptions[0].value
			setValue(finalDefault)
		}
	}, [filteredOptions, value, setValue, menuType, isGroupItemType, isFolderItemType])

	// Memoize the field with options to prevent object recreation
	const fieldWithOptions = useMemo(
		() => ({
			...field,
			options: options,
			defaultValue:
				options.length > 0
					? isFolderItemType
						? getDefaultValueForFolderItemType(menuType as string)
						: isGroupItemType
							? getDefaultValueForGroupItemType(menuType as string)
							: getDefaultValueForMenuType(menuType as string)
					: undefined,
		}),
		[field, options, menuType, isGroupItemType, isFolderItemType],
	)

	// Memoize the onChange handler
	const handleChange = useCallback(
		(value: string) => {
			setValue(value)
		},
		[setValue],
	)

	return (
		<RadioGroupField path={path} field={fieldWithOptions} value={value} onChange={handleChange} />
	)
}
