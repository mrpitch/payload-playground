import { BasePayload } from 'payload'
import { headers as nextHeaders } from 'next/headers'

import type { User, Media } from '@payload-types'

import { Avatar as AvatarPrimitive, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/icons'

const Avatar = async ({ payload }: { payload: BasePayload }) => {
	const headers = await nextHeaders()
	const { user } = (await payload.auth({ headers })) as { user: User | null }

	if (!user) return null
	const avatar = user.avatar as Media

	return (
		<AvatarPrimitive className="h-8 w-8">
			{avatar?.url ? (
				<AvatarImage src={avatar?.url} />
			) : (
				<AvatarFallback>
					<Icon iconName="user" className="fill-current h-5 w-5" />
				</AvatarFallback>
			)}
		</AvatarPrimitive>
	)
}

export default Avatar
