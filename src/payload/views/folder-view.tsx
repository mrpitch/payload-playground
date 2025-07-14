import type { AdminViewServerProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'

export function MyCustomView({ initPageResult, params, searchParams }: AdminViewServerProps) {
	if (!initPageResult) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		)
	}

	const user = initPageResult?.req?.user
	const i18n = initPageResult?.req?.i18n
	const payload = initPageResult?.req?.payload

	if (!user) {
		return (
			<div>
				<p>You must be logged in to view this page.</p>
			</div>
		)
	}
	console.log('initPageResult', initPageResult)
	return (
		<DefaultTemplate
			i18n={i18n}
			locale={initPageResult.locale}
			params={params}
			payload={payload}
			permissions={initPageResult.permissions}
			searchParams={searchParams}
			user={user}
			visibleEntities={initPageResult.visibleEntities}
		>
			<Gutter>
				<h1>My custom Folder View</h1>
				<p>This view uses the Default Template.</p>
			</Gutter>
		</DefaultTemplate>
	)
}

export default MyCustomView
