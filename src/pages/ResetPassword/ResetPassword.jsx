import React, { useState } from "react";
import {
    Container,
    Form,
    FormContent,
    Title,
    Label,
    Input,
    Button,
    ErrorText,
} from "./ResetPassword.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api/authApi"; // Replace with your actual API import
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!password || !confirmPassword) {
            setErrorMsg("Both fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const response = await resetPassword({ email, password: password, confirmPassword: confirmPassword });
            if (response.success) {
                toast.success(response.message || "Password reset successfully.",{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        navigate("/login");
                    }
                });
                // navigate("/login");
            } else {
                setErrorMsg(response.message || "Failed to reset password");
            }
        } catch (error) {
            // console.log(error);
            setErrorMsg(error?.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormContent>
                    <Title>Reset Password</Title>
                    {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
                    <Label htmlFor="password">New Password</Label>
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
                   

                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div style={{ position: 'relative' }}>
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ paddingRight: '40px' }} // extra space for icon
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
                   

                    <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </FormContent>
            </Form>
        </Container>
    );
};

export default ResetPassword;
