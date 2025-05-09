'use client'
import { useAuth } from '@payloadcms/ui'

import type { User, Media } from '@payload-types'

import { Avatar as AvatarPrimitive, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icon } from '@/components/ui/custom/icons'

const Avatar = () => {
	const { user } = useAuth<User>()

	if (!user) return null

	const avatar = user.avatar as Media

	return (
		<AvatarPrimitive className="h-8 w-8">
			{avatar?.url ? (
				<AvatarImage src={avatar?.url} />
			) : (
				<AvatarFallback>
					<Icon iconName="user" className="h-5 w-5 fill-current" />
				</AvatarFallback>
			)}
		</AvatarPrimitive>
	)
}

export default Avatar
