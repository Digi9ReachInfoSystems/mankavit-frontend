import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mankavit_logo from '..//../assets/mankavith-login-logo.svg';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {
    Container,
    Logo,
    LogoImg,
    Title,
    Form,
    Input,
    Button,
    OTPButton,
    SignUpLink,
    FormContent,
    LoginTitle,
    LoginSubTitle,
    Label,
    Overlay,
    Modal,
    TitleModel,
    Text,
    InfoList,
    Actions,
    ButtonModel,
    ForgotPassword
} from './Login.styles';
import { forceLogin, loginUser, loginWithOtp, logoutUser } from '../../api/authApi';
import { clearCookies } from '../../utils/cookiesService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { getDeviceInfo } from '../../utils/deviceInfo';
import Lottie from "lottie-react";
import multipleDevicesAnimation from "../../assets/Lottie/multiple-login.json";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginPhone, setLoginPhone] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loging, setLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [deviceId, setDeviceId] = useState('');
    const [showDevicePopup, setShowDevicePopup] = useState(false);
    const [existingDeviceInfo, setExistingDeviceInfo] = useState(null);
    const [forceLoginData, setForceLoginData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const getDeviceId = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setDeviceId(result.visitorId);
        };

        getDeviceId();
    }, []);

    const isLoginDisabled = loginPhone
    ? !email || !/\S+@\S+\.\S+/.test(email)
    : !email || !password || !/\S+@\S+\.\S+/.test(email);


    const handleLogin = async (e) => {
        try {
            clearCookies();
            e.preventDefault();
            setLogin(true);

            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {

                setShowError(true);
                setErrorMessage('Please enter a valid email address.');
                return;
            }
            // // // console.log(email, password);
            // // // console.log("deviceId", deviceId);
            const DeviceData = await getDeviceInfo();
            // // console.log("DeviceData", DeviceData);
            const userResponse = await loginUser({ email, password, device: DeviceData });
            // // console.log("userResponse", userResponse);
            if (userResponse.success === true) {
                const accessToken = userResponse.accessToken;
                const refreshToken = userResponse.refreshToken;
                const userId = userResponse.user._id;
                // (60s * 60m * 24h * 7days = 604800 seconds)
                document.cookie = `accessToken=${accessToken}; path=/; max-age=604800;`;
                document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800;`;
                document.cookie = `userId=${userId}; path=/; max-age=604800;`;

                if (userResponse.user.role === 'user') {
                    const logoutResponse = await logoutUser({ email });
                    const resepose = await loginWithOtp({ email });
                    if (resepose.success === true) {
                        clearCookies();
                        navigate('/loginOtp', { state: { email: email } });
                    }
                    // navigate('/user');
                } if (userResponse.user.role === 'admin') {
                    navigate('/admin');
                }
            } else if (userResponse.success === false && userResponse.currentDevice) {
                setExistingDeviceInfo(userResponse.currentDevice);
                setForceLoginData(userResponse.forceLoginData);
                setShowDevicePopup(true);
                return;
            }
        } catch (error) {
            // // console.log(error);
            if (error?.response?.data?.success == false) {
                setShowError(true);
                setErrorMessage(error.response.data.message);
            }
        } finally {
            setLogin(false);
        }
    };
    const handleLoginOtpClick = (e) => {
        e.preventDefault();
        setLoginPhone((prevLoginPhone) => !prevLoginPhone);
    }
    const handleOTPLogin = async (e) => {
        e.preventDefault();
        try {
            setLogin(true);
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {

                setShowError(true);
                setErrorMessage('Please enter a valid email address.');
                return;
            }
            const resepose = await loginWithOtp({ email });
            if (resepose.success === true) {
                clearCookies();
                navigate('/loginOtp', { state: { email: email } });
            }
        } catch (error) {
            if (error?.response?.data?.success == false) {
                setShowError(true);
                setErrorMessage(error.response.data.message);
            }
        } finally {
            setLogin(false);
        }
        // Add your OTP login logic here (e.g., API call)
    };
    const handleForceLogin = async () => {
        try {
            setShowDevicePopup(false);
            setLogin(true);
            if (!forceLoginData) {
                // console.error("No force login data available");
                return;
            }
            const userResponse = await forceLogin({ forceLoginData: forceLoginData });
            if (userResponse.success === true) {
                const accessToken = userResponse.accessToken;
                const refreshToken = userResponse.refreshToken;
                const userId = userResponse.user._id;
                // (60s * 60m * 24h * 7days = 604800 seconds)
                document.cookie = `accessToken=${accessToken}; path=/; max-age=604800;`;
                document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800;`;
                document.cookie = `userId=${userId}; path=/; max-age=604800;`;

                if (userResponse.user.role === 'user') {
                    const logoutResponse = await logoutUser({ email });
                    const resepose = await loginWithOtp({ email });
                    if (resepose.success === true) {
                        clearCookies();
                        navigate('/loginOtp', { state: { email: email } });
                    }
                    // navigate('/user');
                } if (userResponse.user.role === 'admin') {
                    navigate('/admin');
                }
            } else {

            }
        } catch (error) {
            // console.error("Error during force login:", error);
        } finally {
            setLogin(false);
        }
    }

    return (
        <Container>
            <Logo>
                <LogoImg src={mankavit_logo} alt="Mankavit Law Academy" />
                <Title>Mankavit <br />Law Academy</Title>
            </Logo>
            <Form onSubmit={(e) => { setShowError(false); e.preventDefault(); loginPhone ? handleOTPLogin(e) : handleLogin(e) }}>
                <FormContent>
                    <LoginTitle>{loginPhone ? "Login with OTP" : "Login with email"}</LoginTitle>
                    {showError ?
                        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
                        : <LoginSubTitle>{loginPhone ? "You’ll receive a 6-digit code to verify next." : "Enter your email and password to log in."}</LoginSubTitle>
                    }
                    <Label htmlFor='email' style={loginPhone ? { marginTop: "80px" } : {}}>Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter you email"
                        value={email}
                        id='email'
                        style={loginPhone ? { marginTop: "40px", marginBottom: "50px" } : {}}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    {
                        loginPhone ? <></> :
                            <>
                                <Label htmlFor='Password'>Password</Label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        id='Password'
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ paddingRight: '40px' }} // extra space for icon
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                            </>
                    }

                  <Button type="submit" disabled={isLoginDisabled}>
    {loging ? "Login..." : "Login"}
</Button>


                        <ForgotPassword onClick={() =>{navigate('/forgot-password')} }>Forgot Password?</ForgotPassword>

                    {/* <OTPButton type="button" onClick={handleLoginOtpClick}>{loginPhone ? "Login with Password" : "Login with OTP"}</OTPButton> */}

                    <SignUpLink>
                        Create new account? <Link to="/signup">Sign Up</Link>
                    </SignUpLink>
                </FormContent>
            </Form>
            {showDevicePopup && existingDeviceInfo && (
                <Overlay>
                    <Modal>
                        <TitleModel>Account Already Logged In</TitleModel>
                        <Text>This account is already active on another device:</Text>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <Lottie
                                className="Lottie"
                                animationData={multipleDevicesAnimation}
                                loop={true}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>;
                        <InfoList>
                            <li><strong>Device ID:</strong> {existingDeviceInfo.deviceId}</li>
                            <li><strong>Device Type:</strong> {existingDeviceInfo.deviceType}</li>
                            <li><strong>Browser:</strong> {existingDeviceInfo.browser_name}</li>
                            <li><strong>IP Address:</strong> {existingDeviceInfo.ipAddress}</li>
                        </InfoList>
                        <Text>Would you like to logout from that device and continue here?</Text>
                        <Actions>
                            <ButtonModel variant="cancel" onClick={() => setShowDevicePopup(false)}>Cancel</ButtonModel>
                            <ButtonModel onClick={handleForceLogin}>Continue</ButtonModel>
                        </Actions>
                    </Modal>
                </Overlay>
            )}
        </Container>
    );
};

export default Login;
