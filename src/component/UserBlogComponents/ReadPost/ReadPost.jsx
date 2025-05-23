// components/ReadPost.js
import React from 'react';
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
import achievers from "../../../assets/achievers.jpg"
import Youtube from '../../../assets/youtube.svg';
import Facebook from '../../../assets/facebook.svg';
import Instagram from '../../../assets/instagram.svg';
import Twitter from '../../../assets/twitter.svg';
import Whatsapp from '../../../assets/whatsapp.svg';
import Linkedin from '../../../assets/linkedIn.svg';
import Telegram from '../../../assets/telegram.svg';
import Header from '../../../pages/LandingPage/LandingHeader/LandingHeader';
import Footer from '../../../pages/LandingPage/Footer/Footer';

// Data for post header
const postHeader = [
    {
        title: 'ILICAT LL.M',
        date: '19 March 2024',
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut illum quis id ea at sint amet laborum officia non itaque. Iure molestias consectetur cupiditate eligendi, architecto quo quos similique dolor quis odio, temporibus repudiandae ut corrupti. Repellat incidunt illum quo enim quis provident quasi dolore, nobis aliquid libero consectetur est soluta blanditiis. Molestias velit inventore voluptate quasi corrupti totam debitis. Earum officia ab mollitia molestiae voluptatem pariatur doloribus numquam odio perferendis dicta quas autem amet dolores nihil, sequi est sint deserunt. Exercitationem natus eveniet repellat est vitae perspiciatis debitis, sint nostrum id tenetur, nemo minus recusandae possimus suscipit architecto ut saepe iste? Vitae voluptas unde numquam earum assumenda blanditiis nesciunt similique nam a doloribus, aliquid fuga cupiditate voluptate officia dolorum consequuntur ab quia hic quam? Quidem consectetur adipisci animi doloremque debitis. Officia perferendis, quibusdam eaque consequatur sapiente excepturi nostrum fuga molestias at illum fugit odit, ex, error hic impedit dolorum beatae. Commodi enim sequi quibusdam, tenetur quam aperiam impedit magnam sed placeat, eaque veniam eos, eius ex ad. Quasi possimus veritatis laudantium provident cumque tempora nesciunt ut mollitia accusamus? Qui impedit, nisi maxime est exercitationem maiores dolor quaerat hic. Incidunt assumenda, maxime error ipsam nemo adipisci rerum quas earum reiciendis qui cum repellendus neque rem fuga magni quos? Omnis, sed deleniti error veniam illo beatae fuga ab, ullam quibusdam eligendi eaque, laudantium cupiditate labore. Autem, recusandae! Deserunt, soluta? Laborum, earum itaque saepe provident velit harum molestiae expedita porro nihil mollitia magnam, voluptatum accusamus eum neque, facilis nesciunt perspiciatis. Facere iusto quasi odit natus? Soluta, illo modi quidem, impedit quam eos fugit at sint beatae ipsa debitis a culpa doloremque? Repellat perspiciatis delectus, dolor consectetur eaque suscipit similique incidunt aliquid molestiae minus, quod maxime hic. Delectus, eum dignissimos veniam, nostrum deleniti et ex a reiciendis facilis quod itaque fugit molestiae vero omnis repudiandae dolorem doloribus exercitationem iusto quo tempora est voluptatem! Iusto debitis rerum laborum sed possimus, voluptates accusamus tenetur ad rem cum vitae ipsam exercitationem similique amet! Dolorum nisi ratione asperiores culpa ipsa consectetur odit dicta repellat? Similique odio distinctio rerum pariatur aut laborum impedit voluptate provident, quos, suscipit soluta. Animi reprehenderit nulla odit excepturi. Nemo minus eum praesentium laborum, repellat provident dolorem iure totam suscipit architecto fugiat deleniti, tenetur deserunt! Molestias perspiciatis repudiandae dignissimos ab fuga exercitationem sequi necessitatibus explicabo reiciendis ducimus dicta iste in sed magnam vel, facere deleniti minus. Provident cupiditate vero magni, harum ad blanditiis minima rerum, nihil recusandae dolor et, hic incidunt. Nesciunt, sit est fugit saepe iusto sequi laudantium voluptatem nostrum ad harum beatae sapiente iste distinctio a deserunt omnis minus architecto provident amet aliquam? Voluptas rem eum vero dolores commodi quae aut illo accusamus incidunt quos nesciunt sequi in tenetur consequatur, quisquam necessitatibus voluptatum temporibus at autem molestiae fuga perferendis corrupti, tempora quibusdam. Perferendis dolore excepturi provident dicta accusamus! Veritatis dolorum architecto eligendi aut quos porro voluptatum laborum ex. Tempore dolorem iste dolore excepturi id, dolorum porro necessitatibus hic corporis rerum quidem illum, eos nam illo? Fugit impedit incidunt sunt suscipit, quidem temporibus?",
        author: 'Anuja Lal',
        authorDescription:
            'Hi! I am Anuja, a lecturer by profession. I did my LL.M (2018–19) from National Law University, Delhi with dual specialization in Constitutional Law and Criminal Law.',
    },
];

const ReadPost = () => {
    return (
        <>       
                    <Header/>
         <Container>
            {postHeader.map((post, index) => (
                <div key={index}>
                    <Title>{post.title}</Title>
                    <Author>{post.date}</Author>
                    <Description>{post.description}</Description>
                </div>
            ))}

            <ImageContainer>
                <AuthorDetails>
                    <AuthorImage>
                    <ProfileImage src={achievers} alt="Anuja Lal" />
                    </AuthorImage>
                    <AuthorInfo>
                        <AuthorName>{postHeader[0].author}</AuthorName>
                        <AuthorBio>
                            {postHeader[0].authorDescription}
                        </AuthorBio>
                    </AuthorInfo>
                </AuthorDetails>

                <div className='space'></div>
                <SocialIcons>
                    <Image
                        src={Facebook}
                        alt="Facebook"
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open('https://www.facebook.com/', '_blank')}
                    />

                    <Image
                        src={Instagram}
                        alt="Instagram"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            window.open('https://www.instagram.com/thevasudev_/', '_blank')
                        }
                    />

                    <Image
                        src={Whatsapp}
                        alt="Whatsapp"
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open('https://wa.me/', '_blank')}
                    />
                    <Image
                        src={Youtube}
                        alt="YouTube"
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open('https://www.youtube.com/', '_blank')}
                    />

                    <Image
                        src={Twitter}
                        alt="Twitter"
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open('https://twitter.com/', '_blank')}
                    />

                    <Image
                        src={Linkedin}
                        alt="LinkedIn"
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open('https://www.linkedin.com/', '_blank')}
                    />
                    <Image
                        src={Telegram}
                        alt="Telegram"
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open('https://t.me/', '_blank')}
                    />
                </SocialIcons>

            </ImageContainer>

        </Container>

        <Footer/>
        </>
    );
};

export default ReadPost;
