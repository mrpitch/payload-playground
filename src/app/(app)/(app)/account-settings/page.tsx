import { getSession } from '@/lib/actions/get-session'
import { Icon } from '@/components/ui/custom/icons'
import { Typography } from '@/components/ui/custom/typography'

export default async function Dashboard() {
	const session = await getSession()
	if (!session) return null
	const { firstName, lastName, email, createdAt, roles } = session
	return (
		<>
			<section className="mt-16">
				<Typography as="h1" size="4xl">
					Account Settings
				</Typography>
				<div className="divide-foreground-light space-y-2 divide-y">
					<div className="flex space-x-3 pt-6 pb-6">
						<Icon iconName="user" className="mt-1 h-5 w-5 shrink-0" />
						<div className="flex-1">
							<Typography as="label" size="lg">
								Name
							</Typography>
							<Typography as="p" className="mt-2">
								{firstName} {lastName}
							</Typography>
						</div>
					</div>
					<div className="flex space-x-3 pt-6 pb-6">
						<Icon iconName="mail" className="mt-1 h-5 w-5 shrink-0" />
						<div className="flex-1">
							<Typography as="label" size="lg">
								Email
							</Typography>
							<Typography as="p" className="mt-2">
								{email}
							</Typography>
						</div>
					</div>
					<div className="flex space-x-3 pt-6 pb-6">
						<Icon iconName="calendarCheck" className="mt-1 h-5 w-5 shrink-0" />
						<div className="flex-1">
							<Typography as="label" size="lg">
								Member since
							</Typography>
							<Typography as="p" className="mt-2">
								{new Date(createdAt).toLocaleDateString()}
							</Typography>
						</div>
					</div>
					<div className="flex space-x-3 pt-6 pb-6">
						<Icon iconName="userRole" className="mt-1 h-5 w-5 shrink-0" />
						<div className="flex-1">
							<Typography as="label" size="lg">
								Role(s)
							</Typography>
							<Typography as="p" className="mt-2">
								{roles?.map((role: string) => role).join(', ')}
							</Typography>
						</div>
					</div>
					<div className="flex space-x-3 pt-6 pb-6">
						<Icon iconName="book" className="mt-1 h-5 w-5 shrink-0" />
						<div className="flex-1">
							<Typography as="label" size="lg">
								Adress
							</Typography>
							<Typography as="p" className="mt-2">
								n/a
							</Typography>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
