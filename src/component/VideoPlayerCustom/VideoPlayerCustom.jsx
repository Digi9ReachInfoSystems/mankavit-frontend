import React, { useRef, useState, useEffect } from "react";
import {
  PlayerContainer,
  Video,
  Controls,
  FloatingOverlay,
  VolumeWrapper,
} from "./VideoPlayerCustom.styles";
import { MdOutlineReplay } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa6";

const VideoPlayerCustom = ({ src, onClick, onEnded, movingText }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const timeRef = useRef(null);
  const volumeRef = useRef(null);
  const speedRef = useRef(null);
  const volumeIconRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ✅ Toggle Play / Pause */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  /* ✅ Update Time + Progress */
  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const time = timeRef.current;

    const updateTime = () => {
      if (!video || !time) return;

      const duration = video.duration || 0;
      const current = video.currentTime || 0;
      const percent = duration ? (current / duration) * 100 : 0;
      progress.value = percent;

      const formatTime = (t) => {
        if (!isFinite(t)) return "0:00";
        const hours = Math.floor(t / 3600);
        const mins = Math.floor((t % 3600) / 60);
        const secs = Math.floor(t % 60);
        return hours > 0
          ? `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
          : `${mins}:${String(secs).padStart(2, "0")}`;
      };

      time.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  /* ✅ Volume Control */
  const handleVolume = () => {
    const video = videoRef.current;
    const volume = volumeRef.current;
    video.volume = volume.value / 100;
    if (video.volume === 0) {
      video.muted = true;
      volumeIconRef.current.textContent = "🔇";
    } else {
      video.muted = false;
      volumeIconRef.current.textContent = "🔊";
    }
  };

  /* ✅ Skip */
  const skip = (sec) => {
    const video = videoRef.current;
    video.currentTime = Math.min(
      Math.max(0, video.currentTime + sec),
      video.duration
    );
  };

  /* ✅ Fullscreen Toggle */
  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!document.fullscreenElement) {
      player.requestFullscreen?.() || player.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  };

  /* ✅ Detect Fullscreen Change */
  useEffect(() => {
    const handleFsChange = () => {
      const fsElement =
        document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(!!fsElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  /* ✅ Floating Overlay Animation + Orientation Handling */
  useEffect(() => {
  const overlay = document.getElementById("floatingOverlay");
  if (!overlay) return;
  let overlayX = 10, overlayY = 10;
  let velX = 0.5, velY = 0.5;
  let rafId;

  const moveOverlay = () => {
    const video = videoRef.current;
    if (!video || !isFullscreen) return;

    const controlsHeight = 60; // reserve space for controls (px)
    const maxX = video.clientWidth - overlay.offsetWidth;
    const maxY = video.clientHeight - overlay.offsetHeight - controlsHeight-8;

    overlayX += velX;
    overlayY += velY;

    if (overlayX < 0 || overlayX > maxX) velX = -velX;
    if (overlayY < 0 || overlayY > maxY) velY = -velY;

    overlay.style.transform = `translate(${overlayX}px, ${overlayY}px)`;
    rafId = requestAnimationFrame(moveOverlay);
  };

  const startAnimation = () => {
    cancelAnimationFrame(rafId);
    moveOverlay();
  };

  const handleOrientationChange = () => {
    const video = videoRef.current;
    if (!video || !overlay || !isFullscreen) return;

    overlayX = (video.clientWidth - overlay.offsetWidth) / 2;
    overlayY = (video.clientHeight - overlay.offsetHeight) / 2;
    overlay.style.transform = `translate(${overlayX}px, ${overlayY}px)`;
  };

  window.addEventListener("orientationchange", handleOrientationChange);
  window.addEventListener("resize", handleOrientationChange);

  startAnimation();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("orientationchange", handleOrientationChange);
    window.removeEventListener("resize", handleOrientationChange);
  };
}, [isFullscreen]);

  /* ✅ Keyboard Shortcuts */
  useEffect(() => {
    const handleKey = (e) => {
      if (["input", "select"].includes(e.target.tagName.toLowerCase())) return;
      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowright":
          skip(30);
          break;
        case "arrowleft":
          skip(-30);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "m":
          videoRef.current.muted = !videoRef.current.muted;
          volumeIconRef.current.textContent = videoRef.current.muted
            ? "🔇"
            : "🔊";
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });

  return (
    <PlayerContainer ref={playerRef}>
      <Video
        ref={videoRef}
        src={src}
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        onClick={() => {
          togglePlay();
          onClick?.();
        }}
        onEnded={onEnded}
      />

      {/* ✅ Overlay only visible in fullscreen */}
      {isFullscreen && (
        <FloatingOverlay id="floatingOverlay">{movingText}</FloatingOverlay>
      )}

      <Controls>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <button onClick={() => skip(-30)}>
            <MdOutlineReplay size={23} />
          </button>

          <button onClick={togglePlay}>
            {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          <button onClick={() => skip(30)}>
            <MdOutlineReplay style={{ transform: "scaleX(-1)" }} size={23} />
          </button>

          <span ref={timeRef}>0:00 / 0:00</span>

          <input
            type="range"
            ref={progressRef}
            min="0"
            max="100"
            defaultValue="0"
            onInput={(e) =>
              (videoRef.current.currentTime =
                (e.target.value / 100) * videoRef.current.duration)
            }
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <select
            ref={speedRef}
            onChange={(e) => (videoRef.current.playbackRate = e.target.value)}
          >
            <option value="0.5" style={{ color: "black" }}>0.5x</option>
            <option value="1" selected style={{ color: "black" }}>1x</option>
            <option value="1.5" style={{ color: "black" }}>1.5x</option>
            <option value="2" style={{ color: "black" }}>2x</option>
          </select>
          <button onClick={toggleFullscreen}>[ ]</button>
        </div>
      </Controls>
    </PlayerContainer>
  );
};

export default VideoPlayerCustom;
