'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/ui/custom/icons'
import { Skeleton } from '@/components/ui/skeleton'

type TVideoPlayerProps = {
	videoId: string
	startAt: number
	title: string
	imageUrl?: string
	loop?: boolean
	muted?: boolean
	controls?: boolean
	volume?: number
	playbackRate?: number
	onReady?: (player: YouTubePlayer) => void
	onPlay?: (player: YouTubePlayer) => void
	onPause?: (player: YouTubePlayer) => void
	onEnded?: (player: YouTubePlayer) => void
	className?: string
}

type YouTubePlayer = {
	playVideo: () => void
	pauseVideo: () => void
	seekTo: (seconds: number, allowSeekAhead: boolean) => void
	mute: () => void
	unMute: () => void
	setVolume: (volume: number) => void
	setPlaybackRate: (rate: number) => void
	destroy: () => void
	getPlayerState: () => number
}

type YouTubeAPI = {
	Player: new (
		element: HTMLElement,
		options: {
			videoId: string
			playerVars?: Record<string, unknown>
			events?: {
				onReady?: (event: { target: YouTubePlayer }) => void
				onStateChange?: (event: { data: number; target: YouTubePlayer }) => void
				onError?: (event: { data: number }) => void
			}
		},
	) => YouTubePlayer
	PlayerState: {
		UNSTARTED: -1
		ENDED: 0
		PLAYING: 1
		PAUSED: 2
		BUFFERING: 3
		CUED: 5
	}
}

declare global {
	interface Window {
		YT?: YouTubeAPI
		onYouTubeIframeAPIReady?: () => void
	}
}

// Simplified API loading following YouTube IFrame API best practices
// Reference: https://developers.google.com/youtube/iframe_api_reference
const loadYouTubeAPI = (): Promise<YouTubeAPI> => {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('YouTube API unavailable during SSR'))
	}

	if (window.YT?.Player) {
		return Promise.resolve(window.YT)
	}

	const existingScript = document.querySelector<HTMLScriptElement>(
		'script[src="https://www.youtube.com/iframe_api"]',
	)
	if (!existingScript) {
		const script = document.createElement('script')
		script.src = 'https://www.youtube.com/iframe_api'
		script.async = true
		document.body.appendChild(script)
	}

	return new Promise((resolve, reject) => {
		const previousCallback = window.onYouTubeIframeAPIReady

		const timeoutId = window.setTimeout(() => {
			window.onYouTubeIframeAPIReady = previousCallback ?? undefined
			reject(new Error('YouTube API timed out'))
		}, 10000)

		const cleanup = () => {
			window.onYouTubeIframeAPIReady = previousCallback ?? undefined
			window.clearTimeout(timeoutId)
		}

		window.onYouTubeIframeAPIReady = () => {
			previousCallback?.()
			if (window.YT?.Player) {
				cleanup()
				resolve(window.YT)
			} else {
				cleanup()
				reject(new Error('YouTube API failed to load'))
			}
		}
	})
}

export const VideoPlayer = ({
	videoId,
	startAt,
	title,
	imageUrl,
	loop,
	muted,
	controls = true,
	volume = 0.5,
	playbackRate,
	onReady,
	onPlay,
	onPause,
	onEnded,
	className,
}: TVideoPlayerProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const playerRef = useRef<YouTubePlayer | null>(null)
	const shouldAutoplayRef = useRef(false)

	const [isMounted, setIsMounted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [hasError, setHasError] = useState<string | null>(null)

	// Initialize player when mounted
	useEffect(() => {
		if (!isMounted || playerRef.current || !containerRef.current) {
			return
		}

		let cancelled = false

		setIsLoading(true)
		loadYouTubeAPI()
			.then((YT) => {
				if (cancelled || !containerRef.current) return

				const playerVars: Record<string, unknown> = {
					start: startAt,
					autoplay: shouldAutoplayRef.current ? 1 : 0,
					controls: controls ? 1 : 0,
					rel: 0,
					modestbranding: 1,
					playsinline: 1,
				}

				const player = new YT.Player(containerRef.current, {
					videoId,
					playerVars,
					events: {
						onReady: (event) => {
							setIsLoading(false)
							playerRef.current = event.target

							if (muted) {
								event.target.mute()
							} else {
								event.target.unMute()
							}

							if (typeof volume === 'number') {
								event.target.setVolume(Math.round(Math.min(Math.max(volume, 0), 1) * 100))
							}

							if (typeof playbackRate === 'number') {
								event.target.setPlaybackRate(playbackRate)
							}

							if (startAt > 0) {
								event.target.seekTo(startAt, true)
							}

							if (shouldAutoplayRef.current) {
								event.target.playVideo()
							}

							onReady?.(event.target)
						},
						onStateChange: (event) => {
							const state = event.data

							if (state === YT.PlayerState.PLAYING) {
								// Dispatch event to pause other players
								document.dispatchEvent(
									new CustomEvent<YouTubePlayer>('yt-player-play', {
										detail: event.target,
									}),
								)
								setIsPlaying(true)
								onPlay?.(event.target)
							}

							if (state === YT.PlayerState.PAUSED) {
								setIsPlaying(false)
								onPause?.(event.target)
							}

							if (state === YT.PlayerState.ENDED) {
								setIsPlaying(false)
								onEnded?.(event.target)
								if (loop) {
									event.target.seekTo(startAt, true)
									event.target.playVideo()
								}
							}
						},
						onError: (event) => {
							setHasError(`YouTube error code ${event.data}`)
							setIsLoading(false)
						},
					},
				})

				playerRef.current = player
			})
			.catch((error) => {
				if (!cancelled) {
					setHasError(error.message ?? 'Failed to load YouTube API')
					setIsLoading(false)
				}
			})

		return () => {
			cancelled = true
			playerRef.current?.destroy()
			playerRef.current = null
		}
	}, [
		controls,
		isMounted,
		loop,
		muted,
		playbackRate,
		startAt,
		videoId,
		volume,
		onReady,
		onPlay,
		onPause,
		onEnded,
	])

	// Control player playback state
	useEffect(() => {
		if (!playerRef.current) return

		if (isPlaying) {
			playerRef.current.playVideo()
		} else {
			playerRef.current.pauseVideo()
		}
	}, [isPlaying])

	// Update player controls (muted, volume, playbackRate)
	useEffect(() => {
		if (!playerRef.current) return

		if (muted) {
			playerRef.current.mute()
		} else {
			playerRef.current.unMute()
		}

		if (typeof volume === 'number') {
			playerRef.current.setVolume(Math.round(Math.min(Math.max(volume, 0), 1) * 100))
		}

		if (typeof playbackRate === 'number') {
			playerRef.current.setPlaybackRate(playbackRate)
		}
	}, [muted, volume, playbackRate])

	// Pause this player when another player starts playing
	useEffect(() => {
		const handleExternalPlay = (evt: Event) => {
			if (!playerRef.current) return
			const { detail } = evt as CustomEvent<YouTubePlayer>
			if (detail !== playerRef.current) {
				playerRef.current.pauseVideo()
				setIsPlaying(false)
			}
		}

		document.addEventListener('yt-player-play', handleExternalPlay)
		return () => {
			document.removeEventListener('yt-player-play', handleExternalPlay)
		}
	}, [])

	const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
	const thumbnailUrl = imageUrl ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

	const handleClick = useCallback(() => {
		shouldAutoplayRef.current = true
		setIsMounted(true)
		setIsPlaying(true)
	}, [])

	const handleRetry = useCallback(() => {
		shouldAutoplayRef.current = true
		setHasError(null)
		setIsMounted(false)
		requestAnimationFrame(() => {
			setIsMounted(true)
			setIsPlaying(true)
		})
	}, [])

	return (
		<div className={cn('relative aspect-video h-full w-full', className)}>
			{!isMounted && (
				<button
					type="button"
					onClick={handleClick}
					className="group relative block h-full w-full cursor-pointer overflow-hidden focus:outline-none"
				>
					<Image
						src={thumbnailUrl}
						alt={title}
						fill
						className="mt-0 mb-0 object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					/>
					<div className="bg-secondary absolute inset-0 opacity-30 transition-opacity group-hover:opacity-40" />
					<PlayIcon />
				</button>
			)}

			{isMounted && (
				<div className="relative h-full w-full">
					<div
						ref={containerRef}
						className="h-full w-full"
						title={title}
						data-video-url={videoUrl}
					/>
					{isLoading && (
						<div className="bg-background/40 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
							<Skeleton className="h-full w-full" />
						</div>
					)}
				</div>
			)}

			{hasError && (
				<div className="bg-background/80 text-foreground absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
					<p className="text-sm">{hasError}</p>
					<button
						type="button"
						onClick={handleRetry}
						className="bg-primary text-primary-foreground rounded-md px-3 py-1 text-sm font-medium"
					>
						Retry
					</button>
				</div>
			)}
		</div>
	)
}

const PlayIcon = () => {
	return (
		<div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
			<div
				className={cn(
					'inline-flex items-center justify-center rounded-full',
					'bg-primary/90 shadow-lg',
					'size-16',
					'transition-transform',
				)}
				aria-hidden="true"
			>
				<Icon iconName="play" className="text-primary-foreground ml-1 size-8 fill-current" />
			</div>
		</div>
	)
}
