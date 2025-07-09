// src/pages/Admin/WebManagement/WhyStudyWithUs/Profile.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormContainer,
  UpdatedGif,
  Form,
  FormWrapper,
  ProfileImage,
  CameraImage,
  InputGroup,
  InputField,
  MobileInputContainer,
  FixedCode,
  MobileNumberInput,
  Label,
  UploadSection,
  UploadButton,
  BrowseButton,
  SubmitButton,
  FlexRow,
  FlexUpload,
  UploadedFileName,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ErrorMessage
} from './Profile.styles';

import { MdOutlineFileUpload } from 'react-icons/md';
import profilePlaceholder from '../../../../assets/profile.png';
import cameraIcon from '../../../../assets/Camera.png';
import profileUpdatedGif from '../../../../assets/profileUpdated.gif';

import { changePasswordOtpSend, getUserByUserId, resendChangePasswordOtp, updateUserById, verifyChangePasswordOtp } from '../../../../api/authApi';
import { uploadFileToAzureStorage } from '../../../../utils/azureStorageService';
import { getCookiesData } from '../../../../utils/cookiesService';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const profilePhotoInputRef = useRef(null);
  const passportPhotoInputRef = useRef(null);
  const idProofInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  const [profileImage, setProfileImage] = useState(profilePlaceholder);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [uploadedIDProof, setUploadedIDProof] = useState(null);

  const [modalFile, setModalFile] = useState(null);
  const [showSuccessGif, setShowSuccessGif] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordModalError, setPasswordModalError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // seconds remaining
  const resendTimerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  useEffect(() => {
    const savedTime = localStorage.getItem('otp_expiry');
    if (savedTime) {
      const remaining = Math.floor((parseInt(savedTime) - Date.now()) / 1000);
      if (remaining > 0) {
        // setIsOtpSent(true);
        setResendTimer(remaining);
        startCountdown(remaining);
      }
    }
  }, []);
  useEffect(() => {
    return () => clearInterval(resendTimerRef.current);
  }, []);

  const startCountdown = (initial) => {
    setResendTimer(initial);
    resendTimerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(resendTimerRef.current);
          localStorage.removeItem('otp_expiry');
          // setIsOtpSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };


  useEffect(() => {
    if (!id) {
      navigate('/error');
      return;
    }
    (async () => {
      setIsLoading(true);
      try {
        const resp = await getUserByUserId(id);
        // console.log('resp', resp);
        if (!resp.success || !resp.user) {
          throw new Error('User not found');
        }
        const u = resp.user;
        setProfileData({
          name: u.displayName || '',
          email: u.email || '',
          mobile: u.phone || ''
        });
        setProfileImage(u.photo_url || profilePlaceholder);

        if (u.passportPhotoUrl) {
          setPassportPhoto({
            name: 'Passport Photo',
            url: u.passportPhotoUrl,
            type: 'image/*'
          });
        }
        if (u.idProofUrl) {
          setUploadedIDProof({
            name: 'ID Proof',
            url: u.idProofUrl,
            type: u.idProofUrl.endsWith('.pdf') ? 'application/pdf' : 'image/*'
          });
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleProfilePhotoUploadClick = () => profilePhotoInputRef.current.click();
  const handlePassportPhotoUploadClick = () => passportPhotoInputRef.current.click();
  const handleIDProofUploadClick = () => idProofInputRef.current.click();

  // const handleProfilePhotoFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file?.type.startsWith('image/')) {
  //     return alert('Select a valid image');
  //   }
  //   setIsLoading(true);
  //   try {
  //     // Upload to 'profile' container in Azure Storage
  //     const { blobUrl, url } = await uploadFileToAzureStorage(file, 'profile');
  //     setProfileImage(blobUrl || url);
  //   } catch {
  //     alert('Upload failed');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handlePassportPhotoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return alert('Select a valid image');
    setIsLoading(true);
    try {
      const { blobUrl, url } = await uploadFileToAzureStorage(file, 'users');
      setPassportPhoto({ name: file.name, url: blobUrl || url, type: file.type });
    } catch {
      // alert('Upload failed');
      toast.error('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIDProofFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const { blobUrl, url } = await uploadFileToAzureStorage(file, 'users');
      setUploadedIDProof({ name: file.name, url: blobUrl || url, type: file.type });
    } catch {
      // alert('Upload failed');
      toast.error('Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setProfileData((p) => ({ ...p, mobile: digits }));
    } else if (name === 'name') {
      const letters = value.replace(/[^a-zA-Z\s]/g, '');
      setProfileData((p) => ({ ...p, name: letters }));
    } else {
      setProfileData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleFileClick = (file) => setModalFile(file);
  const closeModal = () => setModalFile(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {  
  //     const updateData = {
  //       displayName: profileData.name,
  //       phone: profileData.mobile ? `+91${profileData.mobile}` : '',
  //       photo_url: profileImage !== profilePlaceholder ? profileImage : '',
  //       email: profileData.email
  //     };

  //     const response = await updateUserById(id, updateData);

  //     if (!response.success) {
  //       throw new Error(response.message || 'Failed to update user');
  //     }

  //     setShowSuccessGif(true);
  //     setTimeout(() => setShowSuccessGif(false), 3000);
  //   } catch (error) {
  //     console.error('Update error:', error);
  //     setError(error.message || 'Failed to update user');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // Update the handleProfilePhotoFileChange function
  const handleProfilePhotoFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) {
      return alert('Please select a valid image file (JPEG, PNG)');
    }
    setIsLoading(true);
    try {
      const data = await uploadFileToAzureStorage(file, 'profile');
      setProfileImage(data.blobUrl);
      return data.blobUrl; // Return the URL so we can use it in handleSubmit
    } catch (error) {
      // console.error('Upload error:', error);
      // alert('Profile photo upload failed. Please try again.');
      toast.error('Profile photo upload failed. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    // console.log('Profile Image:', profileImage);
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Prepare the update data
      const updateData = {
        displayName: profileData.name.trim(),
        phone: profileData.mobile ? `${profileData.mobile}` : '',
        email: profileData.email.trim(),
        photo_url: profileImage !== profilePlaceholder ? profileImage : ''
      };

      // Validate required fields
      if (!updateData.displayName) {
        throw new Error('Full name is required');
      }
      if (!updateData.email) {
        throw new Error('Email is required');
      }

      // console.log('Submitting update:', updateData); // Debug log

      const response = await updateUserById(id, updateData);
      // console.log('Update response:', response);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update user profile');
      }

      setShowSuccessGif(true);
      setTimeout(() => setShowSuccessGif(false), 1000);
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;

  const handleResendOtp = async () => {
    // console.log('handleResendOtp');
    try {

      const cookiesData = await getCookiesData();
      const response = await resendChangePasswordOtp({ userId: cookiesData.userId, });
      if (response.success) {
        toast.success("OTP has been sent to your phone number successfully");
        // setIsOtpSent(true);

        const expiryTime = Date.now() + 60 * 1000; // 1 minute
        localStorage.setItem('otp_expiry', expiryTime.toString());

        setIsOtpSent(true);
        setResendTimer(60);
        clearInterval(resendTimerRef.current); // clear existing
        startCountdown(60);
      }
    } catch (err) {
      setPasswordModalError('Failed to send OTP. Try again.');
      toast.error('Failed to send OTP. Try again.');
    }
  };

  const handleSavePassword = async () => {
    setPasswordModalError('');

    if (!otp || !currentPassword || !newPassword || !confirmPassword) {
      return setPasswordModalError('All fields are required');
    }

    if (newPassword !== confirmPassword) {
      return setPasswordModalError('Passwords do not match');
    }
    if (otp.length !== 6) {
      return setPasswordModalError('OTP must be 6 digits');
    }
    if (isNaN(otp)) {
      return setPasswordModalError('OTP must be 6 digits');
    }

    if (newPassword.length < 6) {
      return setPasswordModalError('Password must be at least 6 characters');
    }



    try {
      // Call your API to update the password here
      const cookiesData = await getCookiesData();
      const response = await verifyChangePasswordOtp({
        userId: cookiesData.userId,
        Otp: otp,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      })
      setShowPasswordModal(false);
      // Optionally reset fields:
      setOtp('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsOtpSent(false);
      toast.success( 'Password has been updated successfully');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.data?.message || 'Failed to update password');
      setPasswordModalError('Failed to update password');
    }
  };
  const handleChangePasswordClick = async () => {
    try {
      const coookiesData = await getCookiesData();
      const response = await changePasswordOtpSend({ userId: coookiesData.userId });
      con/sole.log("response", response);
      if (response.success) {
        toast.success("OTP has been sent to your phone number successfully ");
        setIsOtpSent(true);
        const expiryTime = Date.now() + 60 * 1000; // 1 minute
        localStorage.setItem('otp_expiry', expiryTime.toString());

        setIsOtpSent(true);
        console.log("isOtpSent", isOtpSent);
        setResendTimer(60);
        clearInterval(resendTimerRef.current); // clear existing
        startCountdown(60);
      }
    } catch (err) {
      toast.error("Failed to Change Password");
    } finally {
      setIsOtpSent(true);
    }



  };

  return (
    <FormContainer>
      {showSuccessGif ? (
        <UpdatedGif>
          <img src={profileUpdatedGif} alt="Updated" />
          <p>Profile Updated</p>
        </UpdatedGif>
      ) : (
        <Form onSubmit={handleSubmit}>
          {/* Profile Photo */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <ProfileImage src={profileImage} alt="Profile" />
            <CameraImage
              src={cameraIcon}
              alt="Change"
              onClick={handleProfilePhotoUploadClick}
            />
            <input
              type="file"
              ref={profilePhotoInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleProfilePhotoFileChange}
            />
          </div>

          <FormWrapper>
            <InputGroup>
              <Label>Full Name</Label>
              <InputField
                name="name"
                value={profileData.name}
                // onChange={handleInputChange}
                disabled
              />
            </InputGroup>

            <FlexRow>
              <InputGroup>
                <Label>Email</Label>
                <InputField
                  type="email"
                  name="email"
                  value={profileData.email}
                  // onChange={handleInputChange}
                  disabled
                />
              </InputGroup>

              <InputGroup>
                <Label>Mobile</Label>
                <MobileInputContainer>
                  <FixedCode>+91</FixedCode>
                  <MobileNumberInput
                    name="mobile"
                    value={profileData.mobile}
                    // onChange={handleInputChange}
                    disabled
                  />
                </MobileInputContainer>
              </InputGroup>
            </FlexRow>

            {/* <FlexRow>
              <UploadSection>
                <Label>Passport Photo</Label>
                <FlexUpload>
                  <UploadButton onClick={handlePassportPhotoUploadClick}>
                    <MdOutlineFileUpload /> Upload
                  </UploadButton>
                  <BrowseButton onClick={handlePassportPhotoUploadClick}>
                    Browse
                  </BrowseButton>
                </FlexUpload>
                <input
                  type="file"
                  ref={passportPhotoInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handlePassportPhotoFileChange}
                />
                {passportPhoto && (
                  <UploadedFileName onClick={() => handleFileClick(passportPhoto)}>
                    {passportPhoto.name}
                  </UploadedFileName>
                )}
              </UploadSection>

              <UploadSection>
                <Label>ID Proof</Label>
                <FlexUpload>
                  <UploadButton onClick={handleIDProofUploadClick}>
                    <MdOutlineFileUpload /> Upload
                  </UploadButton>
                  <BrowseButton onClick={handleIDProofUploadClick}>
                    Browse
                  </BrowseButton>
                </FlexUpload>
                <input
                  type="file"
                  ref={idProofInputRef}
                  style={{ display: 'none' }}
                  accept="image/*,application/pdf"
                  onChange={handleIDProofFileChange}
                />
                {uploadedIDProof && (
                  <UploadedFileName onClick={() => handleFileClick(uploadedIDProof)}>
                    {uploadedIDProof.name}
                  </UploadedFileName>
                )}
              </UploadSection>
            </FlexRow> */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
              <SubmitButton type="submit" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </SubmitButton>
              <SubmitButton type="submit" disabled={isLoading} onClick={(e) => { e.preventDefault(); setShowPasswordModal(true); }}>
                {isLoading ? 'Processing...' : 'Change Password'}
              </SubmitButton>
            </div>


          </FormWrapper>

          {modalFile && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>×</CloseButton>
                {modalFile.type.startsWith('image/') ? (
                  <img
                    src={modalFile.url}
                    alt="Preview"
                    style={{ width: '100%' }}
                  />
                ) : (
                  <iframe
                    src={modalFile.url}
                    title="Document"
                    width="100%"
                    height="500"
                  />
                )}
              </ModalContent>
            </ModalOverlay>
          )}
        </Form>
      )}

      {showPasswordModal && (
        <ModalOverlay onClick={() => {
          setOtp('');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setIsOtpSent(false);
          clearInterval(resendTimerRef.current); setShowPasswordModal(false)
        }}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => {
              setOtp('');
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setIsOtpSent(false);
              clearInterval(resendTimerRef.current); setShowPasswordModal(false)
            }}>×</CloseButton>
            <h3 style={{ marginBottom: '1rem' }}>Change Password</h3>

            <InputGroup>
              <Label>OTP</Label>
              <InputField
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              {/* <SubmitButton
                style={{ marginTop: '8px', width: '100%', height: '70px' }}
                onClick={handleResendOtp}
              > */}

              {
                isOtpSent ? (
                  resendTimer > 0 ? (
                    <SubmitButton disabled style={{ width: '100%', height: '70px' }}>
                      Resend OTP in {resendTimer}s
                    </SubmitButton>
                  ) : (
                    <SubmitButton
                      style={{ width: '100%', height: '70px' }}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </SubmitButton>
                  )
                ) : (
                  <SubmitButton
                    style={{ width: '100%', height: '70px' }}
                    onClick={handleChangePasswordClick}
                  >
                    Send OTP
                  </SubmitButton>
                )}
              {/* </SubmitButton> */}
            </InputGroup>

            <InputGroup>
              <Label>Current Password</Label>
              <div style={{ position: 'relative' }}>
                <InputField
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{ paddingRight: '40px' }}
                />
                <span
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#999',
                  }}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </InputGroup>

            <InputGroup>
              <Label>New Password</Label>
              <div style={{ position: 'relative' }}>
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{ paddingRight: '40px' }}
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
            </InputGroup>

            <InputGroup>
              <Label>Confirm Password</Label>
              <div style={{ position: 'relative' }}>
                <InputField
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter new password"
                  style={{ paddingRight: '40px' }}
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: '#999',
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </InputGroup>

            {passwordModalError && (
              <ErrorMessage>{passwordModalError}</ErrorMessage>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <SubmitButton onClick={handleSavePassword}>Save</SubmitButton>
              <SubmitButton onClick={() => {
                setOtp('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                clearInterval(resendTimerRef.current);
                setShowPasswordModal(false)
              }}>Cancel</SubmitButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

    </FormContainer>
  );
};

export default Profile;