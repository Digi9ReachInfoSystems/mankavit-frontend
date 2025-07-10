import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Logo,
    LogoImg,
    Title,
    Form,
    Input,
    Button,
    SignUpLink,
    FormContent,
    LoginTitle,
    LoginSubTitle,
    Label,
    Link
} from './ForgotPassword.styles'; // Reusing your existing styles
import mankavit_logo from '../../assets/mankavith-login-logo.svg';
import { sendForgotPasswordOtp } from '../../api/authApi';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            setLoading(true);

            // Here you would call your API to send OTP
            // Example:
            const response = await sendForgotPasswordOtp({ email });
            if (response.success) {
                setSuccess('OTP sent successfully. Please check your email.');
                toast.success('OTP sent successfully. Please check your email.', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => { navigate('/forgot-password-otp', { state: { email } }); },
                });

            } else {
                setError(response.message || 'Failed to send OTP');
            }

            // // For now, we'll simulate a successful response
            // setTimeout(() => {
            //     setSuccess('OTP sent successfully. Please check your email.');
            //     navigate('/reset-password', { state: { email } });
            //     setLoading(false);
            // }, 1000);

        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to send OTP');
            setLoading(false);
        }
    };

    return (
        <Container>
            <Logo>
                <LogoImg src={mankavit_logo} alt="Mankavit Law Academy" />
                <Title>Mankavit <br />Law Academy</Title>
            </Logo>

            <Form onSubmit={handleSubmit}>
                <FormContent>
                    <LoginTitle>Forgot Password</LoginTitle>

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}

                    <LoginSubTitle>
                        Enter your email address and we'll send you an OTP to reset your password.
                    </LoginSubTitle>

                    <Label htmlFor='email'>Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>

                    <SignUpLink onClick={() => navigate('/login')}>
                        <Link >Remember your password?</Link>
                    </SignUpLink>
                </FormContent>
            </Form>
        </Container>
    );
};

export default ForgotPassword;