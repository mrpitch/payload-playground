import Link from 'next/link'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getNavData } from '@/lib/utils/navigation'
import { resolveBreadcrumbFromDocsNav } from '@/lib/utils/navigation/processBreadcrumb'

export async function BreadcrumbNav({
	pageTitle,
	slug,
}: {
	pageTitle: string
	slug: string
}) {
	const { docsNav } = await getNavData()
	const resolved = resolveBreadcrumbFromDocsNav(docsNav, slug)

	return (
		<Breadcrumb className="mb-2">
			<BreadcrumbList>
				<BreadcrumbItem>
					<SidebarTrigger />
				</BreadcrumbItem>
				<BreadcrumbSeparator>|</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/docs">Docs</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{resolved?.groupLabel ? (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<span className="text-muted-foreground">{resolved.groupLabel}</span>
						</BreadcrumbItem>
					</>
				) : null}
				{resolved?.folderLabel ? (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<span className="text-muted-foreground">{resolved.folderLabel}</span>
						</BreadcrumbItem>
					</>
				) : null}
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>{resolved?.itemLabel ?? pageTitle}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}
