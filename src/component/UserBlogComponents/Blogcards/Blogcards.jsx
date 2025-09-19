import React, { useEffect, useState } from 'react';
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
import { getAllBlogs } from '../../../api/blogApi';

const Blogcards = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await getAllBlogs();
                // // console.log("response of the blogs", response);
                if (response.success && Array.isArray(response.blogs)) {
                    setExamData(response.blogs);
                } else {
                    // // console.warn("Unexpected blog response format:", response);
                }
            } catch (error) {
                // console.error("Error fetching blogs:", error);
            }
        };
        fetchExams();
    }, []);

    return (
        <CardContainer>
            {examData.map((exam) => (
                <Card key={exam._id}>
                    {/* {exam.image && (
                        <img
                            src={exam.image}
                            alt={exam.title}
                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                        />
                    )} */}
                    <Title>{exam.title}</Title>
                    <AuthorDate>{new Date(exam.createdAt).toLocaleDateString()}</AuthorDate>
                    <Description>{exam.description}</Description>
                    <ReadPostLink onClick={() => navigate(`/userblog/post/${exam._id}`)}>
                        Read Post
                        <ArrowIcon>
                            <FaAngleDoubleRight />
                        </ArrowIcon>
                    </ReadPostLink>
                </Card>
            ))}
        </CardContainer>
    );
};

export default Blogcards;
