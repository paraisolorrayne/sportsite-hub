/**
 * Global registry that enforces mutual-exclusion for video playback.
 *
 * Only one video may play at a time across the entire application.
 * When a new video claims playback, the previously active one is paused
 * through its registered `pause` callback, which must use the safe-pause
 * pattern (awaiting any pending play promise) to avoid AbortError.
 */

type PauseCallback = () => void;

let activeVideo: HTMLVideoElement | null = null;
let activePause: PauseCallback | null = null;

/**
 * Call this right before playing a video.
 * It will pause the previously active video (if any) and register the new one.
 *
 * @param video   – the HTMLVideoElement that is about to play
 * @param pause   – a callback that safely pauses this video (should use safePause)
 */
export function claimPlayback(video: HTMLVideoElement, pause: PauseCallback): void {
  if (activeVideo && activeVideo !== video && activePause) {
    activePause();
  }
  activeVideo = video;
  activePause = pause;
}

/**
 * Call this when a video is paused or its component unmounts.
 * Clears the registry entry only if the given video is the currently active one.
 */
export function releasePlayback(video: HTMLVideoElement): void {
  if (activeVideo === video) {
    activeVideo = null;
    activePause = null;
  }
}

