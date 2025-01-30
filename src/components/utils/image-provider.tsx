import Image from 'next/image'

interface ImageProviderProps {
	src: string
	alt: string
	width: number
	height: number
}
export const ImageProvider: React.FC<ImageProviderProps> = ({
	src,
	alt,
	width,
	height,
}) => {
	return (
		<Image
			src={`${process.env.NEXT_PUBLIC_ASSETS_PATH}${src}`}
			alt={alt}
			width={width}
			height={height}
			draggable="false"
		/>
	)
}
