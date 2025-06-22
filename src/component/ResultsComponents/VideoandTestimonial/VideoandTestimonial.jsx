import React, { useState, useEffect } from 'react';
import {
  GallerySection,
  VideoPlayer,
  ThumbnailSlider,
  ThumbnailCard,
  ThumbnailImage,
  MoreOverlay,
  LeftArrowButton,
  RightArrowButton
} from './VideoandTestimonial.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getAllYoutube } from '../../../api/youtuubeApi';

const VideoandTestimonials = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxVisibleThumbnails, setMaxVisibleThumbnails] = useState(getVisibleCount());

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 768) return 2;
    return 1;
  }

  // Function to convert any YouTube URL to embed format
  const convertToEmbedUrl = (url) => {
    if (!url) return '';
    
    // If it's already an embed URL, return as-is
    if (url.includes('embed')) return url;
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  // Function to get YouTube thumbnail from URL
  const getYoutubeThumbnail = (url) => {
    const videoId = convertToEmbedUrl(url).split('/embed/')[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllYoutube();
        const videos = response.data || [];

        // Map API response to expected format with proper embed URLs
        const formattedVideos = videos
          .filter(item => item.video_link) // Filter out items without video_link
          .map((item, index) => {
            const embedUrl = convertToEmbedUrl(item.video_link);
            return {
              id: item._id?.$oid || `video-${index}`,
              thumbnail: item.thumbnailImage || getYoutubeThumbnail(item.video_link),
              embedUrl: embedUrl,
              originalUrl: item.video_link,
              title: `Video ${index + 1}`
            };
          });

        setVideoList(formattedVideos);
        if (formattedVideos.length > 0) {
          setCurrentVideo(formattedVideos[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching YouTube videos", err);
        setError("Failed to load videos");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMaxVisibleThumbnails(getVisibleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThumbnailClick = (video) => {
    setCurrentVideo(video);
  };

  const handleRightClick = () => {
    if (startIndex + maxVisibleThumbnails < videoList.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleLeftClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const hiddenLeftCount = startIndex;
  const visibleVideos = videoList.slice(startIndex, startIndex + maxVisibleThumbnails);
  const hiddenRightCount = videoList.length - (startIndex + maxVisibleThumbnails);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!videoList.length) {
    return <div>No videos found</div>;
  }

  return (
    <GallerySection>
      <VideoPlayer>
        {currentVideo && currentVideo.embedUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={currentVideo.embedUrl}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div>No video available</div>
        )}
      </VideoPlayer>

      <ThumbnailSlider>
        <LeftArrowButton onClick={handleLeftClick} disabled={startIndex === 0}>
          <FaChevronLeft />
        </LeftArrowButton>

        {hiddenLeftCount > 0 && startIndex > 0 && (
          <ThumbnailCard onClick={() => setStartIndex(startIndex - 1)}>
            <ThumbnailImage 
              src={videoList[startIndex - 1]?.thumbnail || ''} 
              alt="" 
            />
            <MoreOverlay>+{hiddenLeftCount} <br /> Videos</MoreOverlay>
          </ThumbnailCard>
        )}

        {visibleVideos.map((video) => (
          <ThumbnailCard 
            key={video.id} 
            onClick={() => handleThumbnailClick(video)}
            active={currentVideo?.id === video.id}
          >
            <ThumbnailImage src={video.thumbnail} alt={video.title} />
          </ThumbnailCard>
        ))}

        {hiddenRightCount > 0 && (
          <ThumbnailCard onClick={() => setStartIndex(startIndex + 1)}>
            <ThumbnailImage 
              src={videoList[startIndex + maxVisibleThumbnails]?.thumbnail || ''} 
              alt="" 
            />
            <MoreOverlay>+{hiddenRightCount} <br /> Videos</MoreOverlay>
          </ThumbnailCard>
        )}

        <RightArrowButton
          onClick={handleRightClick}
          disabled={startIndex >= videoList.length - maxVisibleThumbnails}
        >
          <FaChevronRight />
        </RightArrowButton>
      </ThumbnailSlider>
    </GallerySection>
  );
};

export default VideoandTestimonials;