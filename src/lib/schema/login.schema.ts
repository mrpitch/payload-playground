import * as z from 'zod'

import { formMessages } from '@/lib/utils/constants'

export const loginFormSchema = z.object({
	email: z.string().email({ message: formMessages.validation.emailNotValid }),
	password: z.string(),
})
