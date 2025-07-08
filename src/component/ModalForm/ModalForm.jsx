import React, { useState } from 'react';
import {
    Overlay,
    ModalBox,
    ModalTitle,
    FieldGroup,
    Input,
    ErrorText,
    SubmitButton
} from './ModalForm.styles';
import { collectQuestionPaperDetails } from '../../api/authApi';
import { toast } from 'react-toastify';

const ModalForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const err = {};
        if (!formData.name.trim()) err.name = 'Name is required';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) err.email = 'Valid email is required';
        if (!formData.phone.match(/^[1-9]\d{9}$/)) err.phone = 'Valid phone is required';
        return err;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationErrors = validate();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
            } else {
                const response = await collectQuestionPaperDetails({name: formData.name, email: formData.email, phoneNumber: formData.phone});

                localStorage.setItem('isDownload', 'true');
                onSubmit();
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Something went wrong');
        }

    };

    return (
        <Overlay>
            <ModalBox onSubmit={handleSubmit}>
                <ModalTitle>Enter your details to get the question papers for free.</ModalTitle>

                <FieldGroup>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </FieldGroup>

                <FieldGroup>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </FieldGroup>

                <FieldGroup>
                    <Input
                        type="text"
                        placeholder="Phone Number"
                        maxLength="10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </FieldGroup>

                <SubmitButton type="submit">Submit</SubmitButton>
            </ModalBox>
        </Overlay>
    );
};

export default ModalForm;
