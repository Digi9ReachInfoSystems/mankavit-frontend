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
  ModalOverlay,
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
        // 1) fetch user
        const userResp = await getUserDetails(userId);
        if (!userResp?.user) {
          throw new Error("User data not found");
        }
        setUser(userResp.user);

        let kyc = null;
        // 2) try by kycRef
        if (userResp.user.kycRef) {
          try {
            const kycResp = await getKYCById(userResp.user.kycRef);
            kyc = kycResp.data?.kyc || kycResp.data || null;
          } catch (err) {
            // swallow 404 only
            if (err.response?.status !== 404) throw err;
          }
        }
        // 3) fallback by userId
        if (!kyc) {
          try {
            const fallbackResp = await getKYCbyUserId(userId);
            kyc = fallbackResp.data?.kyc || fallbackResp.data || null;
          } catch (err) {
            if (err.response?.status !== 404) throw err;
          }
        }

        setKycRecord(kyc);
      } catch (error) {
        console.error("Error fetching KYC:", error);
        // only show toast if not a 404/no-KYC situation
        if (!(error.response?.status === 404)) {
          toast.error(error.message || "Failed to load KYC data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  const handleStatusUpdate = async (newStatus) => {
    if (isSubmitting) return;
    if (!kycRecord) {
      toast.warn("Cannot update - no KYC record found");
      return;
    }

    setIsSubmitting(true);
    try {
      await approveKYC(kycRecord._id, newStatus);

      toast.success(
        newStatus === "approved"
          ? "KYC approved successfully"
          : "KYC rejected successfully"
      );

      // refresh record
      const updatedResp = await getKYCById(kycRecord._id);
      setKycRecord(updatedResp.data?.kyc || null);
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

  // if user hasn't applied => kycRecord is null AND user.kyc_status is "not-applied"
  if (!kycRecord && user.kyc_status === "not-applied") {
    return (
      <Container>
        <Title>KYC Status for {user.displayName || user.email}</Title>
        <NoKycContainer>
          <NoKycMessage>
            This user has not applied for KYC yet.
          </NoKycMessage>
          <BackButton onClick={() => navigate(-1)}>
            Back to Student List
          </BackButton>
        </NoKycContainer>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
      </Container>
    );
  }

  // otherwise render form or approved-without-record
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
                  <DocumentLink
                    href={kycRecord.id_proof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                    onClick={() =>
                      handleImageClick(kycRecord.passport_photo)
                    }
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
                  disabled={
                    isSubmitting || kycRecord.status === "approved"
                  }
                >
                  {isSubmitting ? "Processing..." : "Approve KYC"}
                </SubmitButton>
                <RejectButton
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={
                    isSubmitting || kycRecord.status === "rejected"
                  }
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
        // fallback: KYC status is something else but no record
        <NoKycContainer>
          <NoKycMessage>
            No KYC record found for this user.
          </NoKycMessage>
          <BackButton onClick={() => navigate(-1)}>
            Back to Student List
          </BackButton>
        </NoKycContainer>
      )}

      {modal && (
        <ModalOverlay>
          <Modal>
            <ModalCloseButton onClick={() => setModal(false)}>
              ×
            </ModalCloseButton>
            <h2>Passport Photo</h2>
            <img
              src={modalImage}
              alt="KYC Document"
              style={{ width: "100%" }}
            />
          </Modal>
        </ModalOverlay>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </Container>
  );
}
