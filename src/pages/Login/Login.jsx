import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mankavit_logo from '..//../assets/mankavith-login-logo.svg';
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
} from './Login.styles';
import { loginUser, loginWithOtp } from '../../api/authApi';
import { clearCookies } from '../../utils/cookiesService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginPhone, setLoginPhone] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loging, setLogin] = useState(false);
    const navigate = useNavigate();

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
            const userResponse = await loginUser({ email, password });
            if (userResponse.success === true) {
                const accessToken = userResponse.accessToken;
                const refreshToken = userResponse.refreshToken;
                const userId = userResponse.user._id;
                // (60s * 60m * 24h * 7days = 604800 seconds)
                document.cookie = `accessToken=${accessToken}; path=/; max-age=604800;`;
                document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800;`;
                    document.cookie = `userId=${userId}; path=/; max-age=604800;`;
                if(userResponse.user.role === 'user'){
                    navigate('/user');
                }if(userResponse.user.role === 'admin'){
                    navigate('/admin');
                }
            } else {

            }
        } catch (error) {
            // console.log(error);
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
                navigate('/loginOtp',{state: { email: email }});
            }
        } catch (error) {
            if (error?.response?.data?.success == false) {
                setShowError(true);
                setErrorMessage(error.response.data.message);
            }
        }finally{
            setLogin(false);
        }
        // Add your OTP login logic here (e.g., API call)
    };

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
                        placeholder="Email"
                        value={email}
                        id='email'
                        style={loginPhone ? { marginTop: "40px", marginBottom: "50px" } : {}}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {
                        loginPhone ? <></> :
                            <>
                                <Label htmlFor='Password'>Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    id='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </>
                    }

                    <Button type="submit">{loging ? "Login..." : "Login"}</Button>
                    <OTPButton type="button" onClick={handleLoginOtpClick}>{loginPhone ? "Login with Password" : "Login with OTP"}</OTPButton>

                    <SignUpLink>
                        Create new account? <Link to="/signup">Sign Up</Link>
                    </SignUpLink>
                </FormContent>
            </Form>
        </Container>
    );
};

export default Login;
