// src/pages/Admin/StudentManagement/updateKYC/UpdateKYC.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getKYCById,
  getKYCbyUserId,
  approveKYC,      // keep as-is (approve/reject flow unchanged)
  updateKycById,   // <-- used for updating KYC fields
} from "../../../../../api/kycApi";
import { getUserDetails } from "../../../../../api/authApi";
import { getAuth } from "../../../../../utils/authService";

import {
  Container,
  HeaderBar,
  HeaderLeft,
  Title,
  SubTitle,
  Badge,
  Avatar,
  HeaderRight,
  GhostButton,
  Content,
  Card,
  Grid2,
  Field,
  Label,
  ReadonlyInput,
  StatusRow,
  KycDot,
  ActionsRow,
  PrimaryButton,
  DangerButton,
  DocsGrid,
  DocCard,
  DocThumb,
  DocMeta,
  EmptyState,
  EmptyTitle,
  EmptyText,
  ModalOverlay,
  Modal,
  ModalCloseButton,
  LoaderWrap,
  Spinner,
} from "./updateKYC.style";

export default function UpdateKYC() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [kycRecord, setKycRecord] = useState(null);

  // NEW: edit state and form values
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    id_proof: "",
    passport_photo: "",
    date_of_birth: "",
    fathers_name: "",
    fathers_occupation: "",
    present_address: "",
    current_occupation: "",
    how_did_you_get_to_know_us: "",
  });

  const [modal, setModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);

  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      if (response?.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(
          response?.Permissions?.["studentManagement"]?.readOnly ?? false
        );
      }
    };
    apiCaller();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const userResp = await getUserDetails(userId);
        if (!userResp?.user) throw new Error("User data not found");
        setUser(userResp.user);

        let kyc = null;
        if (userResp.user.kycRef) {
          try {
            const kycResp = await getKYCById(userResp.user.kycRef);
            kyc = kycResp.data?.kyc || kycResp.data || null;
          } catch (err) {
            if (err.response?.status !== 404) throw err;
          }
        }
        if (!kyc) {
          try {
            const fallbackResp = await getKYCbyUserId(userId);
            kyc = fallbackResp.data?.kyc || fallbackResp.data || null;
          } catch (err) {
            if (err.response?.status !== 404) throw err;
          }
        }
        setKycRecord(kyc);

        // seed form if we have kyc
        if (kyc) {
          setForm({
            id_proof: kyc.id_proof || "",
            passport_photo: kyc.passport_photo || "",
            date_of_birth: kyc.date_of_birth
              ? new Date(kyc.date_of_birth).toISOString().slice(0, 10)
              : "",
            fathers_name: kyc.fathers_name || "",
            fathers_occupation: kyc.fathers_occupation || "",
            present_address: kyc.present_address || "",
            current_occupation: kyc.current_occupation || "",
            how_did_you_get_to_know_us: kyc.how_did_you_get_to_know_us || "",
          });
        }
      } catch (error) {
        console.error("Error fetching KYC:", error);
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
      // APPROVE/REJECT FLOW — unchanged
      await approveKYC(kycRecord._id, newStatus);
      toast.success(
        newStatus === "approved"
          ? "KYC approved successfully"
          : "KYC rejected successfully"
      );
      const updatedResp = await getKYCById(kycRecord._id);
      setKycRecord(updatedResp.data?.kyc || updatedResp.data || null);
      setTimeout(() => setIsSubmitting(false), 1000);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err.response?.data?.message || "Status update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocClick = (url) => {
    setModalUrl(url);
    setModal(true);
  };

  const getFilenameFromContentDisposition = (cd) => {
    if (!cd) return null;
    const matchStar = cd.match(/filename\*\s*=\s*[^']*''([^;]+)/i);
    if (matchStar && matchStar[1]) return decodeURIComponent(matchStar[1]);
    const match = cd.match(/filename\s*=\s*"?([^"]+)"?/i);
    if (match && match[1]) return match[1];
    return null;
  };

  const extFromMime = (type) => {
    if (!type) return "";
    const map = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf",
    };
    return map[type] || "";
  };

  const ensureExtension = (name, ext) => {
    if (!ext) return name;
    const hasExt = /\.[a-z0-9]+$/i.test(name);
    if (hasExt) return name;
    return `${name}.${ext}`;
  };

  const sanitizeBaseName = (s) => (s || "document").replace(/[^\w\-]+/g, "_");

  // Always tries blob download; DOES NOT open a new tab.
// Replace your current downloadFile with this
const downloadFile = async (url, baseFilename = "document") => {
  try {
    // IMPORTANT: do NOT send credentials or Authorization headers to Azure Blob
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      // no custom headers here
    });

    if (!res.ok) throw new Error(`Download failed (${res.status})`);

    // Try filename from headers, else fall back
    const cd = res.headers.get("content-disposition");
    const mime = res.headers.get("content-type") || "";
    const getFilenameFromContentDisposition = (cd) => {
      if (!cd) return null;
      const star = cd.match(/filename\*\s*=\s*[^']*''([^;]+)/i);
      if (star?.[1]) return decodeURIComponent(star[1]);
      const plain = cd.match(/filename\s*=\s*"?([^"]+)"?/i);
      return plain?.[1] || null;
    };
    const extFromMime = (type) => {
      const map = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "application/pdf": "pdf",
      };
      return map[type] || "";
    };
    const sanitize = (s) => (s || "document").replace(/[^\w\-]+/g, "_");
    const ensureExt = (name, ext) => (/\.[a-z0-9]+$/i.test(name) ? name : `${name}.${ext}`);

    let finalName =
      getFilenameFromContentDisposition(cd) ||
      ensureExt(sanitize(baseFilename), extFromMime(mime)) ||
      "document";

    const blob = await res.blob();
    if (!/\.[a-z0-9]+$/i.test(finalName)) {
      const ext2 = extFromMime(blob.type);
      if (ext2) finalName = `${finalName}.${ext2}`;
    }

    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = finalName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
    toast.success("Download started");
  } catch (err) {
    console.error("Download error:", err);
    toast.error("Unable to download file");
  }
};


  const formatDate = (iso) => {
    if (!iso) return "N/A";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const isPdf = useMemo(
    () => (url) => typeof url === "string" && url.toLowerCase().endsWith(".pdf"),
    []
  );

  // ===== NEW: edit & save handlers =====
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUpdates = async () => {
    if (!kycRecord?._id) {
      toast.error("No KYC record to update");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        id_proof: form.id_proof || undefined,
        passport_photo: form.passport_photo || undefined,
        date_of_birth: form.date_of_birth
          ? new Date(form.date_of_birth).toISOString()
          : undefined,
        fathers_name: form.fathers_name?.trim() || undefined,
        fathers_occupation: form.fathers_occupation?.trim() || undefined,
        present_address: form.present_address?.trim() || undefined,
        current_occupation: form.current_occupation?.trim() || undefined,
        how_did_you_get_to_know_us:
          form.how_did_you_get_to_know_us?.trim() || undefined,
        // userref: userId, // only if you intend to allow changing it
      };

      const resp = await updateKycById(kycRecord._id, payload);
      if (!resp?.success) throw new Error(resp?.message || "Update failed");

      toast.success("KYC updated");
      // refetch fresh record and reseed form
      const updatedResp = await getKYCById(kycRecord._id);
      const updated = updatedResp.data?.kyc || updatedResp.data || null;
      setKycRecord(updated);
      setForm({
        id_proof: updated?.id_proof || "",
        passport_photo: updated?.passport_photo || "",
        date_of_birth: updated?.date_of_birth
          ? new Date(updated.date_of_birth).toISOString().slice(0, 10)
          : "",
        fathers_name: updated?.fathers_name || "",
        fathers_occupation: updated?.fathers_occupation || "",
        present_address: updated?.present_address || "",
        current_occupation: updated?.current_occupation || "",
        how_did_you_get_to_know_us: updated?.how_did_you_get_to_know_us || "",
      });
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LoaderWrap>
        <Spinner />
        <div>Loading data...</div>
      </LoaderWrap>
    );
  }

  if (!user)
    return (
      <EmptyState>
        <EmptyTitle>User not found</EmptyTitle>
        <GhostButton onClick={() => navigate(-1)}>
          Back to Student List
        </GhostButton>
      </EmptyState>
    );

  // No KYC applied
  if (!kycRecord && user.kyc_status === "not-applied") {
    return (
      <Container>
        <HeaderBar>
          <HeaderLeft>
            <Avatar>
              {(user.displayName || user.email || "U")
                .slice(0, 1)
                .toUpperCase()}
            </Avatar>
            <div>
              <Title>KYC Status</Title>
              <SubTitle>{user.displayName || user.email}</SubTitle>
            </div>
          </HeaderLeft>
          <HeaderRight>
            <Badge $tone="neutral">Not Applied</Badge>
            <GhostButton onClick={() => navigate(-1)}>Back</GhostButton>
          </HeaderRight>
        </HeaderBar>

        <Content>
          <EmptyState>
            <EmptyTitle>No KYC request yet</EmptyTitle>
            <EmptyText>This user has not applied for KYC.</EmptyText>
            <GhostButton onClick={() => navigate(-1)}>
              Back to Student List
            </GhostButton>
          </EmptyState>
        </Content>

        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </Container>
    );
  }

  const StatusBadge = ({ status }) => {
    if (status === "approved") return <Badge $tone="success">Approved</Badge>;
    if (status === "rejected") return <Badge $tone="danger">Rejected</Badge>;
    if (status === "pending") return <Badge $tone="warning">Pending</Badge>;
    return <Badge $tone="neutral">Unknown</Badge>;
  };

  const currentStatus = kycRecord ? kycRecord.status : user.kyc_status;

  return (
    <Container>
      <HeaderBar>
        <HeaderLeft>
          <Avatar>
            {(user.displayName || user.email || "U").slice(0, 1).toUpperCase()}
          </Avatar>
          <div>
            <Title>KYC Review</Title>
            <SubTitle>{user.displayName || user.email}</SubTitle>
          </div>
        </HeaderLeft>
        <HeaderRight>
          <StatusBadge status={currentStatus} />
          <GhostButton onClick={() => navigate(-1)}>Back</GhostButton>
          {!!kycRecord && !readOnlyPermissions && (
            <GhostButton onClick={() => setEditMode((v) => !v)}>
              {editMode ? "Cancel Edit" : "Edit"}
            </GhostButton>
          )}
        </HeaderRight>
      </HeaderBar>

      <Content>
        <Grid2>
          {/* User card */}
          <Card>
            <h3>User Details</h3>
            <Field>
              <Label>Email</Label>
              <ReadonlyInput value={user.email || "N/A"} readOnly />
            </Field>
            <Field>
              <Label>Phone</Label>
              <ReadonlyInput value={user.phone || "N/A"} readOnly />
            </Field>

            <StatusRow>
              <KycDot status={currentStatus} />
              <span>Current Status: {currentStatus}</span>
            </StatusRow>
                  {!readOnlyPermissions && kycRecord && (
            <ActionsRow>
              <PrimaryButton
                onClick={() => handleStatusUpdate("approved")}
                disabled={isSubmitting || kycRecord.status === "approved"}
              >
                {isSubmitting ? "Processing..." : "Approve"}
              </PrimaryButton>
              <DangerButton
                onClick={() => handleStatusUpdate("rejected")}
                disabled={isSubmitting || kycRecord.status === "rejected"}
              >
                {isSubmitting ? "Processing..." : "Reject"}
              </DangerButton>
            </ActionsRow>
          )}
          </Card>

          {/* KYC Details card */}
          <Card>
            <h3>KYC Details</h3>

            <Field>
              <Label>Current Occupation</Label>
              {editMode ? (
                <ReadonlyInput
                  as="input"
                  name="current_occupation"
                  value={form.current_occupation}
                  onChange={onFormChange}
                />
              ) : (
                <ReadonlyInput
                  value={kycRecord?.current_occupation || "N/A"}
                  readOnly
                />
              )}
            </Field>

            <Field>
              <Label>Date of Birth</Label>
              {editMode ? (
                <ReadonlyInput
                  as="input"
                  type="date"
                  name="date_of_birth"
                  value={form.date_of_birth}
                  onChange={onFormChange}
                />
              ) : (
                <ReadonlyInput
                  value={formatDate(kycRecord?.date_of_birth)}
                  readOnly
                />
              )}
            </Field>

            <Field>
              <Label>Father's Name</Label>
              {editMode ? (
                <ReadonlyInput
                  as="input"
                  name="fathers_name"
                  value={form.fathers_name}
                  onChange={onFormChange}
                />
              ) : (
                <ReadonlyInput
                  value={kycRecord?.fathers_name || "N/A"}
                  readOnly
                />
              )}
            </Field>

            <Field>
              <Label>Father's Occupation</Label>
              {editMode ? (
                <ReadonlyInput
                  as="input"
                  name="fathers_occupation"
                  value={form.fathers_occupation}
                  onChange={onFormChange}
                />
              ) : (
                <ReadonlyInput
                  value={kycRecord?.fathers_occupation || "N/A"}
                  readOnly
                />
              )}
            </Field>

            <Field>
              <Label>How did you get to know us?</Label>
              {editMode ? (
                <ReadonlyInput
                  as="input"
                  name="how_did_you_get_to_know_us"
                  value={form.how_did_you_get_to_know_us}
                  onChange={onFormChange}
                />
              ) : (
                <ReadonlyInput
                  value={kycRecord?.how_did_you_get_to_know_us || "N/A"}
                  readOnly
                />
              )}
            </Field>

            <Field>
              <Label>Present Address</Label>
              {editMode ? (
                <ReadonlyInput
                  as="textarea"
                  rows={3}
                  name="present_address"
                  value={form.present_address}
                  onChange={onFormChange}
                />
              ) : (
                <ReadonlyInput
                  as="textarea"
                  rows={3}
                  value={kycRecord?.present_address || "N/A"}
                  readOnly
                />
              )}
            </Field>

            {editMode && !readOnlyPermissions && (
              <ActionsRow>
                <PrimaryButton onClick={handleSaveUpdates} disabled={isSubmitting}>
                  {isSubmitting ? "Saving…" : "Save Changes"}
                </PrimaryButton>
              </ActionsRow>
            )}
          </Card>

          {/* Documents card */}
          <Card>
            <h3>Documents</h3>
            {!kycRecord?.id_proof && !kycRecord?.passport_photo ? (
              <EmptyText>No documents uploaded.</EmptyText>
            ) : (
              <DocsGrid>
                {kycRecord?.id_proof && (
                  <DocCard onClick={() => handleDocClick(`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${kycRecord.id_proof}`)}>
                    {isPdf(kycRecord.id_proof) ? (
                      <DocThumb
                        as="div"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          padding: 8,
                        }}
                      >
                        PDF Preview
                      </DocThumb>
                    ) : (
                      <DocThumb src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${kycRecord.id_proof}`} alt="ID Proof" />
                    )}
                    <DocMeta>
                      <div className="name">ID Proof</div>
                      <div className="actions">
                        <a
                          href={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${kycRecord.id_proof}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open
                        </a>
                        <button
                          className="download"
                          onClick={(e) => {
                            e.stopPropagation();
                            const safeName = (user.displayName || user.email || "user").replace(
                              /\s+/g,
                              "_"
                            );
                            downloadFile(kycRecord.id_proof, `${safeName}_id_proof`);
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </DocMeta>
                  </DocCard>
                )}

                {kycRecord?.passport_photo && (
                  <DocCard onClick={() => handleDocClick(`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${kycRecord.passport_photo}`)}>
                    <DocThumb src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${kycRecord.passport_photo}`} alt="Passport Photo" />
                    <DocMeta>
                      <div className="name">Passport Photo</div>
                      <div className="actions">
                        <a
                          href={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${kycRecord.passport_photo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open
                        </a>
                        <button
                          className="download"
                          onClick={(e) => {
                            e.stopPropagation();
                            const safeName = (user.displayName || user.email || "user").replace(
                              /\s+/g,
                              "_"
                            );
                            downloadFile(
                              kycRecord.passport_photo,
                              `${safeName}_passport_photo`
                            );
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </DocMeta>
                  </DocCard>
                )}
              </DocsGrid>
            )}
          </Card>

          {/* APPROVE/REJECT ACTIONS — unchanged */}
    
        </Grid2>
      </Content>

      {modal && (
        <ModalOverlay onClick={() => setModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setModal(false)}>×</ModalCloseButton>
            {isPdf(modalUrl) ? (
              <embed
                src={modalUrl}
                type="application/pdf"
                width="100%"
                height="80vh"
              />
            ) : (
              <img src={modalUrl} alt="KYC Document" />
            )}
          </Modal>
        </ModalOverlay>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Container>
  );
}
