import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { VideoPlayer } from '@/components/utils/video-player'

export const VideoBlockComponent: React.FC<{
	node: SerializedBlockNode
}> = ({ node }) => {
	const { videoId, startAt, type, title } = node.fields

	if (!videoId) {
		return null
	}
	return <VideoPlayer videoId={videoId} startAt={startAt} type={type} title={title} />
}
