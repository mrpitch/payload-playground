'use client'
import ReactPlayer from 'react-player'
import type { ReactPlayerProps } from 'react-player/types'

export const VideoPlayer = ({ videoUrl, ...props }: { videoUrl: string } & ReactPlayerProps) => {
	return <ReactPlayer {...props} src={videoUrl} />
}
