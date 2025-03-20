import * as z from 'zod'

import { formMessages } from '@/lib/utils/constants'

export const resetPasswordFormSchema = z.object({
	email: z.string().email({ message: formMessages.validation.emailNotValid }),
})
