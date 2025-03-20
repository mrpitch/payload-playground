export const setCookie = (cName: string, cValue: string) => {
	const maxAge: number = 31536000
	const path: string = ''
	document.cookie = `${cName}=${cValue}; max-age=${maxAge}; path=${path}`
}
