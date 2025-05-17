import React, { useState, useEffect } from 'react';
import {
    GallerySection,
    VideoPlayer,
    VideoText,
    ThumbnailSlider,
    ThumbnailCard,
    ThumbnailImage,
    MoreOverlay,
    LeftArrowButton,
    RightArrowButton
} from './VideoandTestimonial.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const videoList = [
    {
        id: 1,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 1'
    },
    {
        id: 2,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 2'
    },
    {
        id: 3,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 3'
    },
    {
        id: 4,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 4'
    },
    {
        id: 5,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 5'
    },
    {
        id: 6,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 6'
    },
    {
        id: 7,
        thumbnail: 'https://img.youtube.com/vi/Znmz_WxMxp4/0.jpg',
        embedUrl: 'https://www.youtube.com/embed/Znmz_WxMxp4',
        title: 'Video 7'
    },
];

const VideoandTestimonials = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [currentVideo, setCurrentVideo] = useState(videoList[0]);
    const [maxVisibleThumbnails, setMaxVisibleThumbnails] = useState(getVisibleCount());

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 768) return 2;
        if (width >= 480) return 1;
        return 1;
    }

    useEffect(() => {
        const handleResize = () => {
            setMaxVisibleThumbnails(getVisibleCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const hiddenLeftCount = startIndex;
    const visibleVideos = videoList.slice(startIndex, startIndex + maxVisibleThumbnails);
    const hiddenRightCount = videoList.length - (startIndex + maxVisibleThumbnails);

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

    return (
        <GallerySection>
            <VideoPlayer>
                <iframe
                    width="100%"
                    height="100%"
                    src={currentVideo.embedUrl}
                    title={currentVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </VideoPlayer>

            <ThumbnailSlider>
                <LeftArrowButton onClick={handleLeftClick} disabled={startIndex === 0}>
                    <FaChevronLeft />
                </LeftArrowButton>

                {hiddenLeftCount > 0 && startIndex > 0 && (
                    <ThumbnailCard>
                        <ThumbnailImage src={videoList[startIndex - 1].thumbnail} alt="" />
                        <MoreOverlay>+{hiddenLeftCount} <br /> Videos</MoreOverlay>
                    </ThumbnailCard>
                )}

                {visibleVideos.map((video) => (
                    <ThumbnailCard key={video.id} onClick={() => handleThumbnailClick(video)}>
                        <ThumbnailImage src={video.thumbnail} alt={video.title} />
                    </ThumbnailCard>
                ))}

                {hiddenRightCount > 0 && (
                    <ThumbnailCard>
                        <ThumbnailImage src={videoList[startIndex + maxVisibleThumbnails]?.thumbnail} alt="" />
                        <MoreOverlay>+{hiddenRightCount} <br /> Videos</MoreOverlay>
                    </ThumbnailCard>
                )}

                <RightArrowButton
                    onClick={handleRightClick}
                    disabled={startIndex >= videoList.length - maxVisibleThumbnails}>
                    <FaChevronRight />
                </RightArrowButton>
            </ThumbnailSlider>
        </GallerySection>
    );
};

export default VideoandTestimonials;
