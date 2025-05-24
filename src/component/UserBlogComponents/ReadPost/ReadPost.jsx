import React, { useEffect, useState } from 'react';
import {
    Container,
    Title,
    Author,
    Description,
    ImageContainer,
    AuthorDetails,
    AuthorImage,
    ProfileImage,
    AuthorInfo,
    AuthorName,
    AuthorBio,
    SocialIcons,
    Image,
} from './ReadPost.styles';

import achievers from "../../../assets/achievers.jpg";
import Youtube from '../../../assets/youtube.svg';
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Twitter from '../../../assets/twitter.svg';
import Whatsapp from '../../../assets/whatsapp.svg';
import Linkedin from '../../../assets/linkedIn.svg';
import Telegram from '../../../assets/telegram.svg';

import Header from '../../../pages/LandingPage/LandingHeader/LandingHeader';
import Footer from '../../../pages/LandingPage/Footer/Footer';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../../api/blogApi';

const ReadPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getBlogById(id);
                console.log('get blog by id response', response);
                if (response.success && response.blog) {
                    setPost(response.blog);
                } else {
                    console.error('Blog not found or invalid response');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Blog post not found</p>;

    return (
        <>
            <Header />
            <Container>
                <div>
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }}
                        />
                    )}
                    <Title>{post.title}</Title>
                    <Author>{new Date(post.createdAt).toLocaleDateString()}</Author>
                    <Description>{post.description}</Description>
                </div>

                <ImageContainer>
                    <AuthorDetails>
                        <AuthorImage>
                            <ProfileImage src={achievers} alt="Author" />
                        </AuthorImage>
                        <AuthorInfo>
                            <AuthorName>Mankavit Team</AuthorName>
                            <AuthorBio>
                                Explore legal excellence with us. Bringing the best insights and prep strategies for law aspirants.
                            </AuthorBio>
                        </AuthorInfo>
                    </AuthorDetails>

                    <div className='space'></div>
                    <SocialIcons>
                        <Image
                            src={Facebook}
                            alt="Facebook"
                            onClick={() => window.open('https://www.facebook.com/', '_blank')}
                        />
                        <Image
                            src={Instagram}
                            alt="Instagram"
                            onClick={() => window.open('https://www.instagram.com/thevasudev_/', '_blank')}
                        />
                        <Image
                            src={Whatsapp}
                            alt="Whatsapp"
                            onClick={() => window.open('https://wa.me/', '_blank')}
                        />
                        <Image
                            src={Youtube}
                            alt="YouTube"
                            onClick={() => window.open('https://www.youtube.com/', '_blank')}
                        />
                        <Image
                            src={Twitter}
                            alt="Twitter"
                            onClick={() => window.open('https://twitter.com/', '_blank')}
                        />
                        <Image
                            src={Linkedin}
                            alt="LinkedIn"
                            onClick={() => window.open('https://www.linkedin.com/', '_blank')}
                        />
                        <Image
                            src={Telegram}
                            alt="Telegram"
                            onClick={() => window.open('https://t.me/', '_blank')}
                        />
                    </SocialIcons>
                </ImageContainer>
            </Container>
            <Footer />
        </>
    );
};

export default ReadPost;