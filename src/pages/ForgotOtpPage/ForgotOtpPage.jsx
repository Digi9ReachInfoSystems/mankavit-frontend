import React, { useState, useEffect } from 'react';
import mankavit_logo from '../../assets/mankavith-login-logo.svg';
import {
    Container,
    Logo,
    LogoImg,
    Title,
    Form,
    FormContent,
    LoginTitle,
    LoginSubTitle,
    Input,
    Button,
    ResendOtp,
} from './ForgotOtpPage.styles';
import { resendForgotPasswordOtp, verifyForgotPasswordOtp } from '../../api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';

const ONE_MINUTE = 60;

const ForgotOtpPage = () => {
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
    const [errorMessage, setErrorMessage] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [verifying, setVerifying] = useState(false);
    const [resendingOtp, setResendingOtp] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const focusInput = (index) => {
        const input = document.getElementById(`otp-${index}`);
        if (input) {
            input.focus();
        }
    };

    const handleChange = (e, index) => {
        let { value } = e.target;
        value = value.replace(/\D/g, '');

        if (value.length <= 1) {
            const updatedOtp = [...otpDigits];
            updatedOtp[index] = value;
            setOtpDigits(updatedOtp);

            if (value && index < 5) {
                focusInput(index + 1);
            }
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (otpDigits[idx]) {
                const updated = [...otpDigits];
                updated[idx] = '';
                setOtpDigits(updated);
                e.preventDefault();
            } else if (idx > 0) {
                const updated = [...otpDigits];
                updated[idx - 1] = '';
                setOtpDigits(updated);
                focusInput(idx - 1);
                e.preventDefault();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // OTP verification logic will go here
            setVerifying(true);
            setTimeout(() => {
                setVerifying(false);
            }, 2000);
            const response = await verifyForgotPasswordOtp({ email: location.state.email, otp: otpDigits.join('') });
            if (response.success) {
                setResendTimer(ONE_MINUTE);
                navigate('/reset-password', { state: { email: location.state.email } });
            }
        } catch (error) {
            // console.log(error);
            setErrorMessage(`${error?.response?.data?.message}`);
        }

    };

    const handleResend = (e) => {
        e.preventDefault();
        try {
            if (resendTimer > 0) return;

            // Resend OTP logic will go here
            resendForgotPasswordOtp({ email: location.state.email });

            setResendingOtp(true);
            setOtpDigits(Array(6).fill(''));
            setResendTimer(60); // 60 seconds timer
            const now = Date.now();
            const expiry = now + ONE_MINUTE * 1000;
            localStorage.setItem('resendOtpExpiry', expiry.toString());
            setResendTimer(ONE_MINUTE);
            setErrorMessage('');

        } catch (error) {
            console.log(error);
            setErrorMessage(`${error?.response?.data?.message}`);
        }

    };
    useEffect(() => {
        const storedExpiry = localStorage.getItem('resendOtpExpiry');
        const now = Date.now();

        if (storedExpiry) {
            const expiryMs = parseInt(storedExpiry, 10);
            if (expiryMs > now) {
                const timeLeft = expiryMs - now;
                setResendTimer(Math.ceil(timeLeft / 1000));
            } else {
                localStorage.removeItem('resendOtpExpiry');
                const newExpiry = now + ONE_MINUTE * 1000;
                localStorage.setItem('resendOtpExpiry', newExpiry.toString());
                setResendTimer(ONE_MINUTE);
            }
        } else {
            const newExpiry = now + ONE_MINUTE * 1000;
            localStorage.setItem('resendOtpExpiry', newExpiry.toString());
            setResendTimer(ONE_MINUTE);
        }
    }, []);
    useEffect(() => {
        let intervalId;
        if (resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer((prev) => {
                    const nextVal = prev - 1;
                    if (nextVal <= 0) {
                        localStorage.removeItem('resendOtpExpiry');
                        return 0;
                    }
                    return nextVal;
                });
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [resendTimer]);

    return (
        <Container>
            <Logo>
                <LogoImg src={mankavit_logo} alt="Mankavit Law Academy" />
                <Title>
                    Mankavit <br /> Law Academy
                </Title>
            </Logo>

            <Form>
                <FormContent>
                    <LoginTitle>Forgot Password OTP Verification</LoginTitle>
                    <LoginSubTitle>
                        OTP has been sent to your email address <br />
                        Please enter OTP to reset your password
                    </LoginSubTitle>

                    {errorMessage && (
                        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                    )}

                    <div style={{ display: 'flex', gap: '20px', margin: '30px ' }}>
                        {otpDigits.map((digit, idx) => (
                            <Input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                            />
                        ))}
                    </div>

                    <Button type="submit" onClick={handleSubmit}>
                        {verifying ? 'Verifying...' : "Verify OTP"}
                    </Button>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        {resendTimer > 0 ? (
                            <ResendOtp>
                                Resend available in <strong>{resendTimer}</strong> seconds
                            </ResendOtp>
                        ) : (
                            <ResendOtp onClick={handleResend}>
                                {resendingOtp ? 'Resend OTP' : 'Resend OTP'}
                            </ResendOtp>
                        )}
                    </div>
                </FormContent>
            </Form>
        </Container>
    );
};

export default ForgotOtpPage;