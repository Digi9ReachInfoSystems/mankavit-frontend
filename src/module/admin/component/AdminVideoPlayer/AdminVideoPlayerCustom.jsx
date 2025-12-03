
import React, { useRef, useState, useEffect } from "react";
import {
  PlayerContainer,
  Video,
  Controls,
  FloatingOverlay,
  VolumeWrapper,
} from "../AdminVideoPlayer/AdminVideoPlayerCustom.style";
import { MdOutlineReplay } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa6";
import { MdFullscreen } from "react-icons/md";

const AdminVideoPlayerCustom = ({ src, onClick, onEnded, movingText }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const timeRef = useRef(null);
  const volumeRef = useRef(null);
  const speedRef = useRef(null);
  const volumeIconRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  // whenever source changes, mark as buffering until video fires canplay/canplaythrough
  useEffect(() => {
    if (!src) return;
    setIsBuffering(true);
    // if videoRef already has a src element, ask it to load (defensive)
    try {
      if (videoRef.current) {
        videoRef.current.pause();
        // reset progress/time display
        if (progressRef.current) progressRef.current.value = 0;
        if (timeRef.current) timeRef.current.textContent = "0:00 / 0:00";
        videoRef.current.load?.();
      }
    } catch (e) {}
  }, [src]);

  useEffect(() => {
    const player = playerRef.current;
    const controls = player?.querySelector('[data-controls]');
    let hideTimer;

    const showControls = () => {
      // don't reveal controls while buffering
      if (!controls || isBuffering) return;
      controls.style.opacity = 1;
      controls.style.pointerEvents = "auto";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        controls.style.opacity = 0;
        controls.style.pointerEvents = "none";
      }, 2500); // Hide after 2.5 seconds
    };

    player?.addEventListener("mousemove", showControls);
    player?.addEventListener("click", showControls);

    player?.addEventListener("mouseleave", () => {
      if (!controls) return;
      controls.style.opacity = 0;
      controls.style.pointerEvents = "none";
    });

    return () => {
      player?.removeEventListener("mousemove", showControls);
      player?.removeEventListener("click", showControls);
      player?.removeEventListener("mouseleave", () => {});
      clearTimeout(hideTimer);
    };
  }, [isBuffering]); // rebind when buffering changes so showControls uses latest flag

  /* Toggle Play / Pause */
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

  /* Update Time + Progress */
  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;
    const time = timeRef.current;
    if (!video) return;

    const updateTime = () => {
      if (!video || !time) return;

      const duration = video.duration || 0;
      const current = video.currentTime || 0;
      const percent = duration ? (current / duration) * 100 : 0;
      if (progress) progress.value = percent;

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

  /* Volume Control */
  const handleVolume = () => {
    const video = videoRef.current;
    const volume = volumeRef.current;
    if (!video || !volume) return;
    video.volume = volume.value / 100;
    if (video.volume === 0) {
      video.muted = true;
      if (volumeIconRef.current) volumeIconRef.current.textContent = "🔇";
    } else {
      video.muted = false;
      if (volumeIconRef.current) volumeIconRef.current.textContent = "🔊";
    }
  };

  /* Toggle Mute */
  const toggleMute = () => {
    const video = videoRef.current;
    const volume = volumeRef.current;
    if (!video || !volume) return;
    video.muted = !video.muted;
    if (video.muted) {
      if (volumeIconRef.current) volumeIconRef.current.textContent = "🔇";
      volume.value = 0;
      video.volume = 0;
    } else {
      if (volumeIconRef.current) volumeIconRef.current.textContent = "🔊";
      if (video.volume === 0) {
        video.volume = 0.5;
        volume.value = 50;
      }
    }
  };

  /* Skip */
  const skip = (sec) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(
      Math.max(0, video.currentTime + sec),
      video.duration || Infinity
    );
  };

  /* Fullscreen Toggle */
  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;
    if (!document.fullscreenElement) {
      player.requestFullscreen?.() || player.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  };

  /* Detect Fullscreen Change */
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

  /* Floating Overlay random movement only when fullscreen */
  useEffect(() => {
    const overlay = document.getElementById("floatingOverlay");
    if (!overlay) return;

    let intervalId;

    const moveOverlayRandomly = () => {
      const video = videoRef.current;
      if (!video || !isFullscreen) return;

      const videoWidth = video.clientWidth;
      const videoHeight = video.clientHeight;

      const overlayWidth = overlay.offsetWidth;
      const overlayHeight = overlay.offsetHeight;

      const topMargin = videoHeight * 0.1; // skip top 10%
      const bottomMargin = 60; // space for controls
      const availableHeight = videoHeight - overlayHeight - bottomMargin - topMargin;
      const availableWidth = videoWidth - overlayWidth - 20; // small right margin

      const randomX = Math.max(0, Math.random() * availableWidth);
      const randomY = Math.max(0, topMargin + Math.random() * Math.max(0, availableHeight));

      overlay.style.transform = `translate(${randomX}px, ${randomY}px)`;
    };

    if (isFullscreen) {
      moveOverlayRandomly();
      intervalId = setInterval(moveOverlayRandomly, 2500);
    }

    const handleResize = () => {
      if (isFullscreen) moveOverlayRandomly();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isFullscreen]);

  /* Keyboard Shortcuts + Mobile Tap Controls */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleKey = (e) => {
      if (["input", "select", "textarea"].includes(e.target.tagName.toLowerCase()))
        return;

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowright":
        case "l":
          skip(30);
          break;
        case "arrowleft":
        case "j":
          skip(-30);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "m":
          toggleMute();
          break;
        case "arrowup":
          video.volume = Math.min(video.volume + 0.1, 1);
          video.muted = false;
          if (volumeRef.current) volumeRef.current.value = video.volume * 100;
          handleVolume();
          break;
        case "arrowdown":
          video.volume = Math.max(video.volume - 0.1, 0);
          if (video.volume === 0) video.muted = true;
          if (volumeRef.current) volumeRef.current.value = video.volume * 100;
          handleVolume();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKey);

    let lastTap = 0;
    let singleTapTimer = null;

    const handleTouch = (e) => {
      const now = Date.now();
      const tapGap = now - lastTap;
      const x = e.touches?.[0]?.clientX ?? 0;
      const width = video.clientWidth || window.innerWidth;

      if (tapGap < 300 && tapGap > 50) {
        clearTimeout(singleTapTimer);
        if (x < width / 2) {
          skip(-30);
        } else {
          skip(30);
        }
      } else {
        clearTimeout(singleTapTimer);
        // could schedule single tap actions here
      }

      lastTap = now;
    };

    video.addEventListener("touchstart", handleTouch);

    return () => {
      document.removeEventListener("keydown", handleKey);
      video.removeEventListener("touchstart", handleTouch);
      clearTimeout(singleTapTimer);
    };
  }, []);

  // VIDEO EVENTS to track buffering / ready state
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoadStart = () => setIsBuffering(true);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onCanPlayThrough = () => {
      setIsBuffering(false);
      if (!playing) {
        v.play().catch(() => {});
        setPlaying(true);
      }
    };
    const onError = () => setIsBuffering(false); // avoid permanent spinner on error

    v.addEventListener("loadstart", onLoadStart);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("canplaythrough", onCanPlayThrough);
    v.addEventListener("error", onError);

    return () => {
      v.removeEventListener("loadstart", onLoadStart);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("canplaythrough", onCanPlayThrough);
      v.removeEventListener("error", onError);
    };
  }, [src, playing]);

  return (
    <PlayerContainer ref={playerRef}>
      <Video
        ref={videoRef}
        src={src}
        playsInline
        webkit-playsinline="true"
        preload="auto"
        // keep video-level buffering handlers but main logic is in useEffect above
        onClick={() => {
          togglePlay();
          onClick?.();
        }}
        onEnded={onEnded}
      />

      {/* loader overlay: show while buffering and keep on top */}
      {isBuffering && (
        <div className="loader-overlay" style={{ zIndex: 150 }}>
          <div className="spinner"></div>
        </div>
      )}

      {/* Floating overlay visible only in fullscreen */}
      {isFullscreen && (
        <FloatingOverlay id="floatingOverlay">{movingText}</FloatingOverlay>
      )}

      {/* Hide the entire Controls bar while buffering to avoid floating progress bar etc */}
      <Controls data-controls style={{ display: isBuffering ? "none" : undefined }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <button type="button" onClick={() => skip(-30)}>
            <MdOutlineReplay size={20} />
          </button>

          <button type="button" onClick={togglePlay}>
            {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          <button type="button" onClick={() => skip(30)}>
            <MdOutlineReplay style={{ transform: "scaleX(-1)" }} size={20} />
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
                (e.target.value / 100) * (videoRef.current.duration || 0))
            }
            style={{ flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <VolumeWrapper>
            <span
              ref={volumeIconRef}
              onClick={toggleMute}
              style={{ cursor: "pointer" }}
            >
              🔊
            </span>
            <input
              type="range"
              ref={volumeRef}
              min="0"
              max="100"
              defaultValue="100"
              onInput={handleVolume}
            />
          </VolumeWrapper>

          <select
            ref={speedRef}
            onChange={(e) => {
              if (videoRef.current) videoRef.current.playbackRate = Number(e.target.value);
            }}
            defaultValue="1"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <button type="button" onClick={toggleFullscreen}><MdFullscreen size={20} /></button>
        </div>
      </Controls>
    </PlayerContainer>
  );
};

export default AdminVideoPlayerCustom;
