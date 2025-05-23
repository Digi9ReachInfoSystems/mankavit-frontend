// components/ExamCard.js
import React from 'react';
import {
    CardContainer,
    Card,
    Title,
    AuthorDate,
    Description,
    ReadPostLink,
    ArrowIcon,
 
} from './Blogcards.styles';
import { useNavigate } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';

const examData = [
    {
        id: 1,
        title: "ILICAT LL.M",
        date: "19 March 2024",
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores enim dolore porro assumenda cum sed fugiat ipsam mollitia perferendis, libero officiis voluptatibus? Ipsa sequi, accusantium voluptatibus neque cupiditate ut illo, sint, corporis perspiciatis nobis voluptas eius ipsam accusamus? Sed, quam a dolorem dolor autem eaque dignissimos nihil repellendus omnis id. Debitis, ipsum aut repellat commodi nesciunt iste eius voluptate facilis, aliquam similique, aperiam ad. Tempora soluta voluptatem molestias voluptate animi ratione aliquid provident veritatis, sit id nobis ipsum, ullam iure, eos tempore doloremque ea minima. Consectetur ipsam debitis ratione saepe, eaque quibusdam eligendi recusandae, excepturi, fugiat mollitia tempora quis modi!',
    },
    {
        id: 2,
        title: "DU LL.M.",
        date: "16 March 2024",
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores enim dolore porro assumenda cum sed fugiat ipsam mollitia perferendis, libero officiis voluptatibus? Ipsa sequi, accusantium voluptatibus neque cupiditate ut illo, sint, corporis perspiciatis nobis voluptas eius ipsam accusamus? Sed, quam a dolorem dolor autem eaque dignissimos nihil repellendus omnis id. Debitis, ipsum aut repellat commodi nesciunt iste eius voluptate facilis, aliquam similique, aperiam ad. Tempora soluta voluptatem molestias voluptate animi ratione aliquid provident veritatis, sit id nobis ipsum, ullam iure, eos tempore doloremque ea minima. Consectetur ipsam debitis ratione saepe, eaque quibusdam eligendi recusandae, excepturi, fugiat mollitia tempora quis modi!',
    },
    {
        id: 3,
        title: "ILICAT LL.M",
        date: "19 March 2024",
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores enim dolore porro assumenda cum sed fugiat ipsam mollitia perferendis, libero officiis voluptatibus? Ipsa sequi, accusantium voluptatibus neque cupiditate ut illo, sint, corporis perspiciatis nobis voluptas eius ipsam accusamus? Sed, quam a dolorem dolor autem eaque dignissimos nihil repellendus omnis id. Debitis, ipsum aut repellat commodi nesciunt iste eius voluptate facilis, aliquam similique, aperiam ad. Tempora soluta voluptatem molestias voluptate animi ratione aliquid provident veritatis, sit id nobis ipsum, ullam iure, eos tempore doloremque ea minima. Consectetur ipsam debitis ratione saepe, eaque quibusdam eligendi recusandae, excepturi, fugiat mollitia tempora quis modi!',
    },
];

const Blogcards = () => {
    const navigate = useNavigate();
    return (
        <CardContainer>
            {examData.map((exam) => (
                <Card key={exam.id}>
                    <Title>{exam.title}</Title>
                    <AuthorDate>{exam.date}</AuthorDate>
                    <Description>{exam.description}</Description>
                    <ReadPostLink onClick={() => navigate("/read-post")}>Read Post
                        <ArrowIcon> <FaAngleDoubleRight /> </ArrowIcon>
                    </ReadPostLink>
                </Card>
            ))}

             


        </CardContainer>
    );
};

export default Blogcards;
