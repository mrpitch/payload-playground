export const revalidate = parseInt(process.env.NEXT_PUBLIC_REVALIDATE || '60')

export const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const previewSecret = process.env.PREVIEW_SECRET || 'hurdi'
