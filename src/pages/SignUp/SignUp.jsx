import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Icons for show/hide functionality
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Your image and styled components
import mankavit_logo from '../../assets/signup-image.svg';
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
  SubTitle
} from './Signup.styles.js';

import { registerUser } from '../../api/authApi';

const SignUp = () => {

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!fullName.trim()) {
      setErrorMessage("Full Name is required.");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.match(phoneRegex)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.match(emailRegex)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long, include a number, an uppercase letter, and a special character.");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords and confirm Password do not match.");
      return false;
    }
    return true;
  };
  const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSignup(e);
  }
};


  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowError(true);
      return;
    }

    setSigningUp(true);
    setShowError(false);

    try {
      const userData = {
        name:fullName,
        phone,
        role: 'user',
        email,
        password,
        confirmPassword,
      };

      const response = await registerUser(userData);
      // console.log("Signup response:", response);

      if (response.success) {
        navigate('/signupOtp', { state: { email } ,replace: true} );
      } else {
        setShowError(true);
        setErrorMessage(response.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      // console.error("Signup error:", error);
      setShowError(true);
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <Container>
      <Logo>
        <LogoImg src={mankavit_logo} alt="Mankavit Law Academy" />
        <Title>Unlock Your Law Dream!</Title>
        <SubTitle>Step into a future of success with expert guidance.</SubTitle>
      </Logo>

      {/* Signup Form */}
    <Form onSubmit={handleSignup} onKeyDown={handleKeyDown}>

        <FormContent>
          <LoginTitle>Create Account</LoginTitle>

          {showError ? (
            <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</p>
          ) : (
            <LoginSubTitle>
              Step into your dream journey for CLAT, AILET, ILICAT & DU LL.M success
            </LoginSubTitle>
          )}

          {/* FULL NAME */}
          <Label htmlFor='name'>Full Name</Label>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            id='name'
            required
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* MOBILE NUMBER */}
          <Label htmlFor='phone'>Mobile Number</Label>
          <Input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            id='phone'
            pattern="[0-9]{10}"
            maxLength="10"
            required
            onChange={(e) => {
              // Remove non-digits
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 10) {
                setPhone(value);
              }
            }}
          />

          {/* EMAIL */}
          <Label htmlFor='email'>Email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            id='email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD w/ Show/Hide */}
          <Label htmlFor='Password'>Password</Label>
          <div style={{ position: 'relative' }}>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD w/ Show/Hide */}
          <Label htmlFor='ConfirmPassword'>Confirm Password</Label>
          <div style={{ position: 'relative' }}>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              id='ConfirmPassword'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ paddingRight: '40px' }}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* SUBMIT BUTTON */}
          <Button type="submit" disabled={signingUp}>
            {signingUp ? 'Signing Up...' : 'Sign up'}
          </Button>

          <SignUpLink>
            Already have an account? <Link to="/login">Log In</Link>
          </SignUpLink>
        </FormContent>
      </Form>
    </Container>
  );
};

export default SignUp;
