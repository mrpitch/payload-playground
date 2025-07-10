import { Fragment } from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Icon } from '@/components/ui/custom/icons'
import { SidebarTrigger } from '@/components/ui/sidebar'

// Utility function to build breadcrumb trail
function buildBreadcrumbTrail(folder: any): Array<{ id: number; name: string; slug?: string }> {
	const trail: Array<{ id: number; name: string; slug?: string }> = []

	// Recursively traverse up the folder hierarchy
	let currentFolder = folder
	while (currentFolder) {
		trail.unshift({
			id: currentFolder.id,
			name: currentFolder.name,
			slug: currentFolder.slug || currentFolder.name?.toLowerCase().replace(/\s+/g, '-'),
		})
		currentFolder = currentFolder.folder
	}

	return trail
}

// Component to render breadcrumbs
export function BreadcrumbNav({ folder, pageTitle }: { folder: any; pageTitle: string }) {
	const breadcrumbTrail = buildBreadcrumbTrail(folder)

	return (
		<Breadcrumb className="mb-2">
			<BreadcrumbList>
				<BreadcrumbItem>
					<SidebarTrigger />
				</BreadcrumbItem>
				<BreadcrumbSeparator>|</BreadcrumbSeparator>

				{/* Render all folders as links */}
				{breadcrumbTrail.map((item, index) => (
					<Fragment key={item.id}>
						<BreadcrumbItem>
							<BreadcrumbLink href={`/${item.slug}`}>{item.name}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</Fragment>
				))}

				{/* Always render the current page as the last item */}
				<BreadcrumbItem>
					<BreadcrumbPage>{pageTitle}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}
