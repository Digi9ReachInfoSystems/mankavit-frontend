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
import { MdFullscreen } from "react-icons/md";

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

useEffect(() => {
  const player = playerRef.current;
  const controls = player?.querySelector('[data-controls]');
  let hideTimer;

  const showControls = () => {
    if (!controls) return;
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
    controls.style.opacity = 0;
    controls.style.pointerEvents = "none";
  });

  return () => {
    player?.removeEventListener("mousemove", showControls);
    player?.removeEventListener("click", showControls);
    player?.removeEventListener("mouseleave", () => {});
    clearTimeout(hideTimer);
  };
}, []);



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

  /* ✅ Toggle Mute */
  const toggleMute = () => {
    const video = videoRef.current;
    const volume = volumeRef.current;
    video.muted = !video.muted;
    if (video.muted) {
      volumeIconRef.current.textContent = "🔇";
      volume.value = 0;
      video.volume = 0;
    } else {
      volumeIconRef.current.textContent = "🔊";
      if (video.volume === 0) {
        video.volume = 0.5;
        volume.value = 50;
      }
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
/* ✅ Floating Overlay - Random Position instead of Continuous Movement */
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

    const topMargin = videoHeight * 0.1; // ✅ Skip top 10%
    const bottomMargin = 60; // ✅ Space for controls
    const availableHeight = videoHeight - overlayHeight - bottomMargin - topMargin;
    const availableWidth = videoWidth - overlayWidth - 20; // small right margin

    // Generate random X/Y
    const randomX = Math.random() * availableWidth;
    const randomY = topMargin + Math.random() * availableHeight;

    overlay.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };

  // Change position every 2.5 seconds
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
/* ✅ Keyboard Shortcuts + Mobile Tap Controls */
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  // --- ⌨️ Keyboard Controls (Desktop)
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
        volumeRef.current.value = video.volume * 100;
        handleVolume();
        break;
      case "arrowdown":
        video.volume = Math.max(video.volume - 0.1, 0);
        if (video.volume === 0) video.muted = true;
        volumeRef.current.value = video.volume * 100;
        handleVolume();
        break;
      default:
        break;
    }
  };

  document.addEventListener("keydown", handleKey);

  // --- 📱 Tap Controls (Mobile)
  let lastTap = 0;
  let singleTapTimer = null;

  const handleTouch = (e) => {
    const now = Date.now();
    const tapGap = now - lastTap;
    const x = e.touches[0].clientX;
    const width = video.clientWidth;

    if (tapGap < 300 && tapGap > 50) {
      // ✅ Double-tap → skip
      clearTimeout(singleTapTimer);      // cancel pending single tap
      if (x < width / 2) {
        skip(-30);
        showTapFeedback("rewind");
      } else {
        skip(30);
        showTapFeedback("forward");
      }
    } else {
      // ✅ Single-tap → play/pause after short delay (to detect double tap)
      clearTimeout(singleTapTimer);
      // singleTapTimer = setTimeout(() => {
      //   togglePlay();
      // }, 10);
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
        // onDoubleClick={toggleFullscreen} 
        onEnded={onEnded}
      />

      {/* ✅ Overlay only visible in fullscreen */}
      {isFullscreen && (
        <FloatingOverlay id="floatingOverlay">{movingText}</FloatingOverlay>
      )}

      <Controls data-controls>
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

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Volume Control */}
          <VolumeWrapper>
            <span 
              ref={volumeIconRef} 
              onClick={toggleMute}
              style={{ cursor: 'pointer' }}
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
              style={{ width: '80px' }}
            />
          </VolumeWrapper>

          <select
            ref={speedRef}
            onChange={(e) => (videoRef.current.playbackRate = e.target.value)}
          >
            <option value="0.5" style={{ color: "black" }}>0.5x</option>
            <option value="1" selected style={{ color: "black" }}>1x</option>
            <option value="1.5" style={{ color: "black" }}>1.5x</option>
            <option value="2" style={{ color: "black" }}>2x</option>
          </select>
          <button onClick={toggleFullscreen}><MdFullscreen size={24} /></button>
        </div>
      </Controls>
    </PlayerContainer>
  );
};

export default VideoPlayerCustom;