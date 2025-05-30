// FeedbackModal.js
import React, { useState } from 'react';
import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    RatingContainer,
    Star,
    TextInput,
    TextArea,
    SubmitButton,
    CloseButton,
    FormGroup,
    Label
} from './FeedbackModal.styles';

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = () => {
        onSubmit({ rating, title, review });
        setRating(0);
        setTitle('');
        setReview('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <h3>Leave a Review</h3>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <RatingContainer>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                active={star <= (hover || rating)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </Star>
                        ))}
                    </RatingContainer>
                    
                    <FormGroup>
                        <Label>Title</Label>
                        <TextInput
                            type="text"
                            placeholder="Enter review title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label>Review</Label>
                        <TextArea
                            placeholder="Write your detailed review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <SubmitButton 
                        onClick={handleSubmit} 
                        disabled={rating === 0 || !title.trim()}
                    >
                        Submit Review
                    </SubmitButton>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

export default FeedbackModal;