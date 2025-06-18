// src/pages/Admin/StudentManagement/updateKYC/UpdateKYC.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getKYCById,
  getKYCbyUserId,
  approveKYC,
} from "../../../../../api/kycApi";
import { getUserDetails } from "../../../../../api/authApi";

import {
  Container,
  Title,
  FormWrapper,
  FormRow,
  Column,
  FieldWrapper,
  Label,
  KYCTitle,
  Input,
  SubmitButton,
  StatusWrapper,
  KycDot,
  DocumentLink,
  DocumentImage,
  ButtonContainer,
  RejectButton,
  NoKycContainer,
  NoKycMessage,
  BackButton,
  StatusInfo,
  Modal,
  ModalCloseButton,
  ModalOverlay
} from "./updateKYC.style";

export default function UpdateKYC() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [kycRecord, setKycRecord] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const userResp = await getUserDetails(userId);
        if (!userResp || !userResp.user) {
          throw new Error("User data not found");
        }
        setUser(userResp.user);

        let kyc = null;
        if (userResp.user.kycRef) {
          const kycResp = await getKYCById(userResp.user.kycRef);
          kyc = kycResp?.data?.kyc || kycResp?.data || null;
        }

        if (!kyc) {
          const fallbackResp = await getKYCbyUserId(userId);
          kyc = fallbackResp?.data?.kyc || fallbackResp?.data || null;
        }

        setKycRecord(kyc);
      } catch (error) {
        console.error("Error fetching KYC:", error);
        toast.error(error.message || "Failed to load KYC data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

const handleStatusUpdate = async (newStatus) => {
  if (isSubmitting) return;
  setIsSubmitting(true);
  try {
    if (!kycRecord) {
      toast.warn("Cannot update - no KYC record found");
      return;
    }

    await approveKYC(kycRecord._id, newStatus);

    // ✅ Explicit toast message
    if (newStatus === "approved") {
      toast.success("KYC approved successfully");
    } else if (newStatus === "rejected") {
      toast.success("KYC rejected successfully");
    }

    const updatedResp = await getKYCById(kycRecord._id);
    if (updatedResp && updatedResp.data?.kyc) {
      setKycRecord(updatedResp.data.kyc);
    }
  } catch (err) {
    console.error("Error updating status:", err);
    toast.error(err.response?.data?.message || "Status update failed");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleImageClick = (url) => {
    setModal(true);
    setModalImage(url);
  };

  if (loading) return <div>Loading data...</div>;
  if (!user) return <div>User not found.</div>;

  const renderContactFields = () => (
    <FormRow>
      <Column>
        <FieldWrapper>
          <Label>Email</Label>
          <Input value={user.email || "N/A"} readOnly />
        </FieldWrapper>
      </Column>
      <Column>
        <FieldWrapper>
          <Label>Phone</Label>
          <Input value={user.phone || "N/A"} readOnly />
        </FieldWrapper>
      </Column>
    </FormRow>
  );

  const renderBackButton = () => (
    <FormRow>
      <Column>
        <ButtonContainer>
          <BackButton onClick={() => navigate(-1)}>
            Back to Student List
          </BackButton>
        </ButtonContainer>
      </Column>
    </FormRow>
  );

  return (
    <Container>
      <Title>KYC Status for {user.displayName || user.email}</Title>

      {user.kyc_status === "approved" && !kycRecord ? (
        <FormWrapper>
          <FormRow>
            <Column>
              <FieldWrapper>
                <KYCTitle>Current KYC Status</KYCTitle>
                <StatusWrapper>
                  <KycDot status="approved" />
                  approved
                  <StatusInfo>(marked in user record)</StatusInfo>
                </StatusWrapper>
              </FieldWrapper>
            </Column>
          </FormRow>
          {renderContactFields()}
          {renderBackButton()}
        </FormWrapper>
      ) : kycRecord ? (
        <FormWrapper>
          <FormRow>
            <Column>
              <FieldWrapper>
                <KYCTitle>Current KYC Status</KYCTitle>
                <StatusWrapper>
                  <KycDot status={kycRecord.status} />
                  {kycRecord.status}
                </StatusWrapper>
              </FieldWrapper>
            </Column>
          </FormRow>

          {renderContactFields()}

          {kycRecord.id_proof && (
            <FormRow>
              <Column>
                <FieldWrapper>
                  <Label>ID Proof</Label>
                  <DocumentLink href={kycRecord.id_proof} target="_blank">
                    View ID Document
                  </DocumentLink>
                </FieldWrapper>
              </Column>
            </FormRow>
          )}

          {kycRecord.passport_photo && (
            <FormRow>
              <Column>
                <FieldWrapper>
                  <Label>Passport Photo</Label>
                  <DocumentImage
                    src={kycRecord.passport_photo}
                    alt="Passport"
                    onClick={() => handleImageClick(kycRecord.passport_photo)}
                  />
                </FieldWrapper>
              </Column>
            </FormRow>
          )}

          <FormRow>
            <Column>
              <ButtonContainer>
                <SubmitButton
                  onClick={() => handleStatusUpdate("approved")}
                  disabled={isSubmitting || kycRecord.status === "approved"}
                >
                  {isSubmitting ? "Processing..." : "Approve KYC"}
                </SubmitButton>
                <RejectButton
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={isSubmitting || kycRecord.status === "rejected"}
                >
                  {isSubmitting ? "Processing..." : "Reject KYC"}
                </RejectButton>
                <BackButton onClick={() => navigate(-1)}>
                  Back to Student List
                </BackButton>
              </ButtonContainer>
            </Column>
          </FormRow>
        </FormWrapper>
      ) : (
        <NoKycContainer>
          <NoKycMessage>
            {user.kyc_status === "not-applied"
              ? "This user has not applied for KYC yet."
              : "No KYC record found for this user."}
          </NoKycMessage>
          <BackButton onClick={() => navigate(-1)}>
            Back to Student List
          </BackButton>
        </NoKycContainer>
      )}

      {modal && (
        <ModalOverlay>
          <Modal onClose={() => setModal(false)}>
            <ModalCloseButton onClick={() => setModal(false)}>X</ModalCloseButton>
            <h2 className="modal-title">Passport Photo</h2>
            <img src={modalImage} alt="KYC Document" className="modal-image" />
          </Modal>
        </ModalOverlay>
      )}

      {/* ✅ Toast Container */}
      {/* Toast Container for react-toastify */}
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
    </Container>
  );
}
