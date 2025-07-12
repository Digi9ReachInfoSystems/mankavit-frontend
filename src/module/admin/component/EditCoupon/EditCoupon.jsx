import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FormContainer,
    Title,
    InputGroup,
    InputField,
    Label,
    SubmitButton,
    FlexRow,
    UploadSection,
    UploadButton,
    UploadedFileName,
    BrowseButton,
    FlexUpload,
    UserSelection,
    UserCheckbox,
    UserLabel,
    UserList,
    UserItem,
    ErrorMessage,
    TypeSelection,
    TypeRadio,
    TypeLabel,
    CheckboxSection,
    CheckboxSectionTitle,
    CheckboxList,
    CheckboxLabel,
    CheckboxInput,
    ToggleContainer,
    ToggleLabel,
    SearchInput
} from './EditCoupon.styles';
import { activateOrDeactivateCoupon, getCouponById, updateCoupon } from '../../../../api/couponApi';
import { getAllStudents } from '../../../../api/userApi';
import { MdOutlineFileUpload } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadFileToAzureStorage } from '../../../../utils/azureStorageService';
import Switch from 'antd/es/switch';
import api from '../../../../config/axiosConfig';
import { set } from 'date-fns';
import { getAuth } from '../../../../utils/authService';

const EditCoupon = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const couponImageInputRef = useRef(null);
    const [couponImage, setCouponImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [loadData, setLoadData] = useState(false);
    const [activeStatus, setActiveStatus] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
    useEffect(() => {
        const apiCaller = async () => {
            const response = await getAuth();
            response.Permissions;
            if (response.isSuperAdmin === true) {
                setReadOnlyPermissions(false);
            } else {
                setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
            }
        }
        apiCaller();
    }, []);

    const [couponData, setCouponData] = useState({
        coupon_name: '',
        coupon_des: '',
        start_date: '',
        end_date: '',
        discount_amount: '',
        coupon_image: '',
        coupon_type: 'All',
        user_list: [],
        coupon_code: '',
        is_active: false
    });
    const fetchUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const response = await getAllStudents();
            setUsers(response.data?.students || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
            setUsers([]);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => {
        const fetchCouponData = async () => {
            setIsLoadingData(true);
            try {
                const response = await getCouponById(id);
                const data = response?.coupon || response;

                // Format dates for datetime-local input
                const formatDateForInput = (dateString) => {
                    if (!dateString) return '';
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16);
                };

                setCouponData({
                    _id: data._id,
                    coupon_name: data.coupon_name,
                    coupon_des: data.coupon_des,
                    start_date: formatDateForInput(data.start_date),
                    end_date: formatDateForInput(data.end_date),
                    discount_amount: data.discount_amount,
                    coupon_image: data.coupon_image,
                    coupon_type: data.coupon_type,
                    user_list: data.user_list?.map(user => typeof user === 'object' ? user._id : user) || [],
                    coupon_code: data.coupon_code,
                    is_active: data.is_active || false
                });

                // If coupon type is "Selected users", fetch users
                if (data.coupon_type === 'Selected users') {
                    fetchUsers();
                }
            } catch (error) {
                console.error('Error fetching coupon data:', error);
                toast.error('Failed to load coupon data');
            } finally {
                setIsLoadingData(false);
            }
        };



        fetchCouponData();
    }, [id]);

    useEffect(() => {
        const apiCaller = async () => {
            const response = await getCouponById(id);
            const data = response?.coupon || response;
            setActiveStatus(data.is_active);
        }
        apiCaller();
    }, [loadData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCouponData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTypeChange = (type) => {
        setCouponData(prev => ({
            ...prev,
            coupon_type: type,
            user_list: type === 'All' ? [] : prev.user_list
        }));

        // Fetch users when switching to "Selected users" type
        if (type === 'Selected users' && users.length === 0) {
            fetchUsers();
        }
    };

    const handleUserSelection = (userId) => {
        setCouponData(prev => {
            const isSelected = prev.user_list.includes(userId);
            return {
                ...prev,
                user_list: isSelected
                    ? prev.user_list.filter(id => id !== userId)
                    : [...prev.user_list, userId]
            };
        });
    };

    const handleToggleChange = async (id) => {
        try {
            if (readOnlyPermissions) {
                toast.error("You don't have permission to change activation status");
                return;
            }
            const response = await activateOrDeactivateCoupon(id);
            toast.success(response.message);
            setLoadData(!loadData);

        } catch (err) {
            console.log(err);
            toast.error('Failed to update coupon');
        }

    };

    const handleCouponImageUploadClick = () => {
        couponImageInputRef.current.click();
    };

    const uploadFile = async (file, containerName) => {
        try {
            const response = await uploadFileToAzureStorage(file, containerName);
            if (!response?.blobUrl) {
                throw new Error('Upload failed - no URL returned');
            }
            return response.blobUrl;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleCouponImageFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith('image/')) {
            return toast.error('Please select a valid image for coupon');
        }
        setIsLoading(true);
        try {
            const url = await uploadFile(file, 'upload');
            setCouponData(prev => ({
                ...prev,
                coupon_image: url
            }));
            setCouponImage(file);
            toast.success('Coupon image uploaded!');
        } catch (err) {
            console.error(err);
            toast.error('Coupon image upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const errs = {};

        // Required fields
        const requiredFields = [
            'coupon_name', 'coupon_des', 'start_date',
            'end_date', 'discount_amount', 'coupon_image',
            'coupon_code'
        ];

        requiredFields.forEach(field => {
            if (!couponData[field]) {
                errs[field] = `${field.replace('_', ' ')} is required`;
            }
        });

        // Date validation
        if (couponData.start_date && couponData.end_date) {
            const startDate = new Date(couponData.start_date);
            const endDate = new Date(couponData.end_date);

            if (startDate >= endDate) {
                errs.end_date = 'End date must be after start date';
            }
        }

        // Discount validation
        if (couponData.discount_amount) {
            const discount = Number(couponData.discount_amount);
            if (isNaN(discount) || discount <= 0) {
                errs.discount_amount = 'Discount must be greater than 0';
            }
        }

        // Coupon code validation
        if (couponData.coupon_code && !/^[A-Za-z0-9]{5}$/.test(couponData.coupon_code)) {
            errs.coupon_code = 'Coupon code must be 5 alphanumeric characters';
        }

        // User list validation for Selected users type
        if (couponData.coupon_type === 'Selected users' && couponData.user_list.length === 0) {
            errs.user_list = 'Please select at least one user';
        }

        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Final check if image was uploaded
            let finalCouponImage = couponData.coupon_image;

            if (couponImage && !finalCouponImage) {
                finalCouponImage = await uploadFile(couponImage, 'coupons');
            }

            const payload = {
                ...couponData,
                coupon_image: finalCouponImage,
                discount_amount: Number(couponData.discount_amount)
            };

            await updateCoupon(id, payload);
            toast.success('Coupon updated successfully!', {
                onClose: () => navigate('/admin/web-management/coupon')
            });
        } catch (err) {
            console.error('Full submission error:', {
                message: err.message,
                response: err.response,
                stack: err.stack
            });
            toast.error(err.response?.data?.message || 'Failed to update coupon');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return <div>Loading coupon data...</div>;
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Edit Coupon</Title>

            <FlexRow>
                <InputGroup>
                    <Label>Coupon Name*</Label>
                    <InputField
                        name="coupon_name"
                        value={couponData.coupon_name}
                        onChange={handleChange}
                        placeholder="Enter Coupon Name"
                        disabled={isLoading}
                    />
                    {formErrors.coupon_name && <ErrorMessage>{formErrors.coupon_name}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                    <Label>Coupon Code* (5 characters)</Label>
                    <InputField
                        name="coupon_code"
                        value={couponData.coupon_code}
                        onChange={handleChange}
                        placeholder="e.g. SUMMR5"
                        maxLength="5"
                        disabled={isLoading}
                    />
                    {formErrors.coupon_code && <ErrorMessage>{formErrors.coupon_code}</ErrorMessage>}
                </InputGroup>
            </FlexRow>

            <InputGroup>
                <Label>Description*</Label>
                <InputField
                    name="coupon_des"
                    value={couponData.coupon_des}
                    onChange={handleChange}
                    placeholder="Enter Coupon Description"
                    disabled={isLoading}
                />
                {formErrors.coupon_des && <ErrorMessage>{formErrors.coupon_des}</ErrorMessage>}
            </InputGroup>

            <FlexRow>
                <InputGroup>
                    <Label>Start Date*</Label>
                    <InputField
                        type="datetime-local"
                        name="start_date"
                        value={couponData.start_date}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {formErrors.start_date && <ErrorMessage>{formErrors.start_date}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                    <Label>End Date*</Label>
                    <InputField
                        type="datetime-local"
                        name="end_date"
                        value={couponData.end_date}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    {formErrors.end_date && <ErrorMessage>{formErrors.end_date}</ErrorMessage>}
                </InputGroup>
            </FlexRow>

            <InputGroup>
                <Label>Discount Amount*</Label>
                <InputField
                    type="number"
                    name="discount_amount"
                    value={couponData.discount_amount}
                    onChange={handleChange}
                    placeholder="Enter Discount Amount"
                    min="1"
                    disabled={isLoading}
                />
                {formErrors.discount_amount && <ErrorMessage>{formErrors.discount_amount}</ErrorMessage>}
            </InputGroup>

            <TypeSelection>
                <Label>Coupon Type*</Label>
                <FlexRow>
                    <UserItem>
                        <TypeRadio
                            type="radio"
                            id="type-all"
                            name="coupon_type"
                            checked={couponData.coupon_type === 'All'}
                            onChange={() => handleTypeChange('All')}
                            disabled={isLoading}
                        />
                        <TypeLabel htmlFor="type-all">All Users</TypeLabel>
                    </UserItem>

                    <UserItem>
                        <TypeRadio
                            type="radio"
                            id="type-selected"
                            name="coupon_type"
                            checked={couponData.coupon_type === 'Selected users'}
                            onChange={() => handleTypeChange('Selected users')}
                            disabled={isLoading}
                        />
                        <TypeLabel htmlFor="type-selected">Selected Users</TypeLabel>
                    </UserItem>
                </FlexRow>
            </TypeSelection>

            {
                couponData.coupon_type === 'Selected users' && (
                    <FlexRow>
                        <CheckboxSection>
                            <CheckboxSectionTitle>Add Students</CheckboxSectionTitle>

                            {/* Add this search input */}
                            <SearchInput
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <CheckboxList>
                                {users
                                    .filter(user => {
                                        const searchLower = searchTerm.toLowerCase();
                                        return (
                                            user.displayName?.toLowerCase().includes(searchLower) ||
                                            user.email?.toLowerCase().includes(searchLower)
                                        );
                                    })
                                    .map((item, index) => (
                                        <CheckboxLabel key={item._id || index}>
                                            <CheckboxInput
                                                type="checkbox"
                                                checked={couponData.user_list.includes(item._id)}
                                                onChange={() => handleUserSelection(item._id)}
                                            />
                                            {item.displayName} ({item.email})
                                        </CheckboxLabel>
                                    ))
                                }
                            </CheckboxList>
                        </CheckboxSection>
                    </FlexRow>
                )
            }

            <ToggleContainer>
                <Label>Status</Label>
                <div>
                    <Switch
                        checked={activeStatus}
                        onChange={() => handleToggleChange(couponData._id)}
                        disabled={isLoading}
                    />
                    {/* <ToggleLabel>{couponData.is_active ? 'Active' : 'Inactive'}</ToggleLabel> */}
                </div>
            </ToggleContainer>

            <UploadSection $hasError={!!formErrors.coupon_image}>
                <Label>Coupon Image*</Label>
                <FlexUpload>
                    <UploadButton
                        type="button"
                        onClick={handleCouponImageUploadClick}
                        disabled={isLoading}
                    >
                        <MdOutlineFileUpload /> Upload
                    </UploadButton>
                </FlexUpload>
                <input
                    type="file"
                    ref={couponImageInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleCouponImageFileChange}
                    disabled={isLoading}
                />
                {couponImage ? (
                    <UploadedFileName>
                        {couponImage.name}
                    </UploadedFileName>
                ) : couponData.coupon_image ? (
                    <UploadedFileName>
                        Current image: {couponData.coupon_image.split('/').pop()}
                    </UploadedFileName>
                ) : null}
                {formErrors.coupon_image && (
                    <ErrorMessage>{formErrors.coupon_image}</ErrorMessage>
                )}
            </UploadSection>
            {
                !readOnlyPermissions &&
                <SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating Coupon...' : 'Update Coupon'}
                </SubmitButton>
            }



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

export default EditCoupon;