'use client'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Modal, SelectField, useField, useModal, Button, useForm } from '@payloadcms/ui'

import type { SelectFieldClientComponent, SelectFieldClientProps } from 'payload'

export const MenuTypeSelectField: SelectFieldClientComponent = (props: SelectFieldClientProps) => {
  const { path, field } = props

  // Form bindings
  const { value, setValue } = useField<string>({ path })
  const { rows: menuItems, setValue: setMenuItems } = useField<any[]>({
    path: 'menuItems',
    hasRows: true,
  })

  // Modal controls
  const { openModal, closeModal } = useModal()
  const modalSlug = useMemo(() => `confirm-change-menutype-${path}`, [path])

  // Also access form-level dispatcher for field removal
  const { dispatchFields, reset } = useForm()

  // Track pending selection awaiting confirmation (supports clear via undefined)
  const [pendingValue, setPendingValue] = useState<string | undefined | null>(null)
  const prevValueRef = useRef<string | undefined>(value)

  // Intercept selection changes
  const handleRequestChange = useCallback(
    (next: any) => {
      // Normalize value from SelectField (can be string, object, null)
      const raw = typeof next === 'string' ? next : (next?.value ?? next)
      const nextValue = raw == null || raw === '' ? undefined : (raw as string)
      // If there is no previous value yet, allow directly
      if (!prevValueRef.current) {
        setValue(nextValue)
        prevValueRef.current = nextValue
        return
      }

      // No-op if same
      if (nextValue === prevValueRef.current) return

      // If clearing selection, confirm as a destructive change too
      if (nextValue === undefined) {
        // Revert UI to previous value, then open modal to confirm clear
        setValue(prevValueRef.current)
        setPendingValue(undefined)
        openModal(modalSlug)
        return
      }

      // Ask for confirmation before destructive change
      // Immediately revert the visual selection to the previous value so that
      // selecting the same option again will still trigger onChange.
      setValue(prevValueRef.current)
      setPendingValue(nextValue)
      openModal(modalSlug)
    },
    [modalSlug, openModal, setValue],
  )

  const handleConfirm = useCallback(() => {
    // Apply the pending value (including undefined for clear) and clear menu items

    if (pendingValue !== null) {
      // Update local form state only (effective on save)
      setValue(pendingValue as any)
      // Remove all rows in menuItems explicitly from last to first
      const total = Array.isArray(menuItems) ? menuItems.length : 0
      for (let i = total - 1; i >= 0; i -= 1) {
        dispatchFields?.({ type: 'REMOVE_ROW', rowIndex: i, path: 'menuItems' })
      }
      prevValueRef.current = pendingValue as any
    }
    setPendingValue(null)
    closeModal(modalSlug)
  }, [pendingValue, setValue, dispatchFields, closeModal, modalSlug, setMenuItems])

  const handleCancel = useCallback(() => {
    // Ensure the select value remains the previous value
    if (prevValueRef.current != null) {
      setValue(prevValueRef.current)
    }
    setPendingValue(null)
    closeModal(modalSlug)
  }, [closeModal, modalSlug, setValue])

  // Pass through options from schema; no duplication required
  const fieldWithOptions = useMemo(
    () => ({
      ...field,
      placeholder: (field as any)?.placeholder ?? 'Select a menu type',
    }),
    [field],
  )

  return (
    <>
      <SelectField
        path={path}
        field={fieldWithOptions}
        value={value}
        onChange={handleRequestChange}
      />
      <Modal slug={modalSlug} className="payload__modal-item confirmation-modal delete-document">
        <div className="confirmation-modal__wrapper">
          <div className="confirmation-modal__content">
            <h1>Change menu type</h1>
            <span>
              This will <b>delete all entries</b> in the current menu version.
            </span>
          </div>
          <div className="confirmation-modal__controls">
            <Button buttonStyle="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button buttonStyle="primary" onClick={handleConfirm}>
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
