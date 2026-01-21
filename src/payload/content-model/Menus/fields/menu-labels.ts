'use client'

import { useRowLabel } from '@payloadcms/ui'

export const MenuItemLabel = () => {
  const { data, rowNumber } = useRowLabel<{ menuItems: { label?: string } }>()

  return data.menuItems?.label || `Item ${String(rowNumber).padStart(2, '0')} `
}

export const GroupItemLabel = () => {
  const { data, rowNumber } = useRowLabel<{ groupItem: { label?: string } }>()

  return data.groupItem?.label || `Group Item ${String(rowNumber).padStart(2, '0')} `
}

export const FolderItemLabel = () => {
  const { data, rowNumber } = useRowLabel<{ folderItem: { label?: string } }>()

  return data.folderItem?.label || `Folder Item ${String(rowNumber).padStart(2, '0')} `
}
