import { useMemo } from 'react'
import { useAllFormFields } from '@payloadcms/ui'
import { EmailTemplateType } from '../types/email-templates'
import { getEmailFields } from '../utils/email-field-mappers'

export const useEmailFields = (type: EmailTemplateType) => {
	const [fields] = useAllFormFields()

	return useMemo(() => {
		return getEmailFields(type, fields)
	}, [fields, type])
}
