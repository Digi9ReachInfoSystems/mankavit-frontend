import React, { useState, useEffect, useRef } from 'react';
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

} from './OtpLogin.styles';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { resendLoginOtp, verifyLoginOtp } from '../../api/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCookies } from '../../utils/cookiesService';
import { getDeviceInfo } from '../../utils/deviceInfo';

const ONE_MINUTE = 120;

const OtpLogin = () => {
    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));

    const [resendTimer, setResendTimer] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [resendingOtp, setResendingOtp] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [deviceId, setDeviceId] = useState('');
    useEffect(() => {
        const getDeviceId = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setDeviceId(result.visitorId);
        };

        getDeviceId();
    }, []);

   
     
    

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

            // Move focus if not the last box
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
    const isOtpComplete = otpDigits.every(digit => digit.length === 1);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (verifying) return;
            setVerifying(true);
            clearCookies();
            const otpValue = otpDigits.join('');
            setErrorMessage('');

            if (otpValue.length < 6) {
                setErrorMessage('Please enter all 6 digits of the OTP.');
                return;
            }
             const DeviceData = await getDeviceInfo();
            const userResponse = await verifyLoginOtp({ email: location.state.email, loginOtp: otpValue, device: DeviceData });
            if (userResponse.success === true) {
                const accessToken = userResponse.accessToken;
                const refreshToken = userResponse.refreshToken;
                const userId = userResponse.user._id;
                // (60s * 60m * 24h * 7days = 604800 seconds)
                document.cookie = `accessToken=${accessToken}; path=/; max-age=604800;`;
                document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800;`;
                document.cookie = `userId=${userId}; path=/; max-age=604800;`;
                navigate('/user');
            }
        } catch (error) {
            if (error?.response?.data?.success == false) {
                // setShowError(true);
                setErrorMessage(error.response.data.message);
            }
        } finally {
            setVerifying(false);
        }

    };

    const handleResend = async (e) => {
        try {
            e.preventDefault();
            if (resendTimer > 0) return;

            setOtpDigits(Array(6).fill(''));
            // Send new OTP logic here (API call, etc.)

            // // // console.log('Resending new OTP...');
            setResendingOtp(true);
            const userResponse = await resendLoginOtp({ email: location.state.email });
            if (userResponse.success === true) {
                const now = Date.now();
                const expiry = now + ONE_MINUTE * 1000;
                localStorage.setItem('resendOtpExpiry', expiry.toString());
                setResendTimer(ONE_MINUTE);
                setErrorMessage('');
            }
        } catch (error) {
            if (error?.response?.data?.success == false) {
                // setShowError(true);
                setErrorMessage(error.response.data.message);
            }
        } finally {
            setResendingOtp(false);
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
            {/* Left Side Logo Section */}
            <Logo>
                <LogoImg src={mankavit_logo} alt="Mankavit Law Academy" />
                <Title>
                    Mankavit <br /> Law Academy
                </Title>
            </Logo>

            {/* OTP Form Section */}
            <Form  >
                <FormContent>
                    <LoginTitle>OTP Verification</LoginTitle>
                    <LoginSubTitle>
                        OTP has been sent on your email address <br />
                        Please enter OTP to login
                    </LoginSubTitle>

                    {/* Show error message if any */}
                    {errorMessage && (
                        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                    )}

                    {/* Six OTP inputs in a row */}
                    <div style={{ display: 'flex', gap: '20px', margin: '30px ' }}>
                        {otpDigits.map((digit, idx) => (
                            <Input
                                key={idx}
                                id={`otp-${idx}`}
                                type="text"
                                nputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, idx)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}

                            />
                        ))}
                    </div>

                   <Button
    type="submit"
    onClick={handleSubmit}
    disabled={!isOtpComplete || verifying || resendingOtp}
>
    {resendingOtp ? 'Resending OTP...' : verifying ? 'Verifying...' : "Verify & Login"}
</Button>

                    {/* Resend OTP Section */}
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        {resendTimer > 0 ? (
                            <ResendOtp >
                                Resend available in <strong>{resendTimer}</strong> seconds
                            </ResendOtp>
                        ) : (
                            <ResendOtp

                                onClick={handleResend}
                            >
                                Resend OTP
                            </ResendOtp>
                        )}
                    </div>
                </FormContent>
            </Form>
        </Container>
    );
};

export default OtpLogin;
