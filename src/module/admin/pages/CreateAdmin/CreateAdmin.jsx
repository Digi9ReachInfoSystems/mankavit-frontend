import React, { useState } from "react";
import {
    FormContainer,
    Title,
    InputGroup,
    InputField,
    Label,
    SubmitButton,
    FlexRow,
    CourseSelection,
    CourseCheckbox,
    CourseLabel,
    CourseList,
    CourseItem,
    ErrorMessage,
    CheckboxGroup,
    CheckboxLabel,
    SectionTitle
} from "./CreateAdmin.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSubAdmin } from "../../../../api/authApi";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        displayName: "",
        phone: "",
        isSuperAdmin: false,
        permissions: {
            studentManagement: { access: false, readOnly: false },
            courseManagement: { access: false, readOnly: false },
            paymentManagement: { access: false, readOnly: false },
            webManagement: { access: false, readOnly: false },
            mockTestManagement: { access: false, readOnly: false },
            staticPageManagement: { access: false, readOnly: false },
            meetingManagement: { access: false, readOnly: false },
        }
    });

    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate= useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAccessChange = (module) => {
        setForm((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [module]: {
                    access: !prev.permissions[module].access,
                    readOnly: !prev.permissions[module].access ? false : prev.permissions[module].readOnly
                }
            }
        }));
    };

    const handleReadOnlyChange = (module) => {
        if (form.permissions[module].access) {
            setForm((prev) => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [module]: {
                        ...prev.permissions[module],
                        readOnly: !prev.permissions[module].readOnly
                    }
                }
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!form.email) errors.email = "Email is required";
        if (!form.password) errors.password = "Password is required";
        if (!form.displayName) errors.displayName = "Name is required";

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errors.email = 'Invalid email format';
        }

        if (form.phone && !/^\+?\d{10,15}$/.test(form.phone)) {
            errors.phone = 'Invalid phone number (10-15 digits, + optional)';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        const payload = {
            email: form.email,
            password: form.password,
            displayName: form.displayName,
            phone: form.phone,
            isSuperAdmin: form.isSuperAdmin,
            ...form.permissions
        };

        try {
            console.log("Submitting", payload);
            const response = await createSubAdmin(payload);
            toast.success("Admin created successfully");
            setForm({
                ...form,
                email: "",
                password: "",
                displayName: "",
                phone: "",
                isSuperAdmin: false,
                permissions: {
                    studentManagement: { access: false, readOnly: false },
                    courseManagement: { access: false, readOnly: false },
                    paymentManagement: { access: false, readOnly: false },
                    webManagement: { access: false, readOnly: false },
                    mockTestManagement: { access: false, readOnly: false },
                    staticPageManagement: { access: false, readOnly: false },
                    meetingManagement: { access: false, readOnly: false },
                }
            });
            navigate("/admin/subadmins-management")
        } catch (err) {
            toast.error("Failed to create admin", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Create Admin</Title>

            <FlexRow>
                <InputGroup>
                    <Label>Name*</Label>
                    <InputField
                        type="text"
                        name="displayName"
                        value={form.displayName}
                        onChange={handleChange}
                        placeholder="Enter Admin Name"
                        disabled={isLoading}
                    />
                    {formErrors.displayName && <ErrorMessage>{formErrors.displayName}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                    <Label>Email*</Label>
                    <InputField
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        disabled={isLoading}
                    />
                    {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
                </InputGroup>
            </FlexRow>

            <FlexRow>
                <InputGroup>
                    <Label>Password*</Label>
                    <div style={{ position: 'relative' }}>
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            disabled={isLoading}
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: '#999',
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {formErrors.password && <ErrorMessage>{formErrors.password}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                    <Label>Phone</Label>
                    <InputField
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone (e.g. +919876543210)"
                        maxLength="15"
                        disabled={isLoading}
                    />
                    {formErrors.phone && <ErrorMessage>{formErrors.phone}</ErrorMessage>}
                </InputGroup>
            </FlexRow>

            <CourseSelection>
                <Label style={{
                    backgroundColor: "lightgrey",
                    padding: "5px",
                    borderRadius: "5px",
                }}>
                    Admin Permissions
                </Label>

                <SectionTitle>Module Access</SectionTitle>

                <CourseList>
                    {Object.entries(form.permissions).map(([module, { access, readOnly }]) => (
                        <CourseItem key={module}>
                            <div style={{ marginBottom: '10px' }}>
                                <CourseLabel>
                                    {module.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </CourseLabel>
                            </div>

                            <CheckboxGroup>
                                <CheckboxLabel>
                                    <CourseCheckbox
                                        type="checkbox"
                                        checked={access}
                                        onChange={() => handleAccessChange(module)}
                                        disabled={isLoading}
                                    />
                                    Access
                                </CheckboxLabel>

                                <CheckboxLabel>
                                    <CourseCheckbox
                                        type="checkbox"
                                        checked={readOnly}
                                        onChange={() => handleReadOnlyChange(module)}
                                        disabled={isLoading || !access}
                                        style={{ opacity: access ? 1 : 0.5 }}
                                    />
                                    Read Only
                                </CheckboxLabel>
                            </CheckboxGroup>
                        </CourseItem>
                    ))}
                </CourseList>
            </CourseSelection>

            {/* <InputGroup>
                <Label>
                    <CourseCheckbox
                        type="checkbox"
                        checked={form.isSuperAdmin}
                        onChange={() => setForm({ ...form, isSuperAdmin: !form.isSuperAdmin })}
                        disabled={isLoading}
                    />
                    Super Admin (Grants all permissions)
                </Label>
            </InputGroup> */}

            <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Creating Admin...' : 'Create Admin'}
            </SubmitButton>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </FormContainer>
    );
};

export default CreateAdmin;