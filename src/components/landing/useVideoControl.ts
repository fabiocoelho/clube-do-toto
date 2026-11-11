import { useEffect, useRef } from "react";

// Click/tap toggles play/pause; scrolling away from the top pauses, back to top resumes.
export function useVideoControl() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const video = videoRef.current;
      if (!video) return;
      if (window.scrollY === 0) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    // Keep links and buttons working without toggling the video.
    if ((e.target as HTMLElement).closest("a, button")) return;
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return { videoRef, togglePlay };
}
