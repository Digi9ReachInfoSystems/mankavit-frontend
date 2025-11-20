import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Label,
  ReadOnlyText,
  ImageWrapper,
} from './ViewTestimonial.styles';
import { getTestimonialById } from '../../../../../../api/testimonialApi';

const ViewTestimonial = () => {
  const { id } = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await getTestimonialById(id);
        setTestimonial(response);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  if (loading) {
    return <Container>Loading testimonial...</Container>;
  }

  if (!testimonial) {
    return <Container>Testimonial not found.</Container>;
  }

  return (
    <Container>
      <Title>View Testimonial</Title>

      <Label>Student Name</Label>
      <ReadOnlyText>{testimonial.name || 'N/A'}</ReadOnlyText>

      <Label>Testimonial Details</Label>
      <ReadOnlyText>{testimonial.description || 'N/A'}</ReadOnlyText>

      <Label>Course</Label>
      <ReadOnlyText>{testimonial.rank || 'N/A'}</ReadOnlyText>

      <Label>Student Image</Label>
      {testimonial.testimonial_image ? (
        <ImageWrapper>
          <img
            src={testimonial.testimonial_image}
            alt="Student"
            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
          />
        </ImageWrapper>
      ) : (
        <ReadOnlyText>No image uploaded</ReadOnlyText>
      )}
    </Container>
  );
};

export default ViewTestimonial;
