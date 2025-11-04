import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderRow,
  Title,
  SortByContainer,
  SortLabel,
  SortSelect,
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  ActionsContainer,
  ButtonBar,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  CreateButton,
  ToggleSwitch,
  ToggleSlider,
  ResetPasswordButton,
  ToggleLabel,
  ResetPasswordModalOverlay,
  ResetPasswordModalContent,
  ResetPasswordInput,
  ModalButton,
  ModalActions,
  ModalTitle,
  ModalBackdrop,
  ControlsRow, // 👈 NEW
} from "./AdminManagement.styles";

import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSubAdmin,
  getAllAdmins,
  resetAdminPassword,
} from "../../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { blockAndUnblockUser, bulkDeleteSubAdmin } from "../../../../api/userApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import { getCookiesData } from "../../../../utils/cookiesService";

export default function AdminManagement() {
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const navigate = useNavigate();
  const [loadData, setLoadData] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [BulkDelete, setBulkDelete] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await getAllAdmins();
        const cookiesData = await getCookiesData();
        setUserId(cookiesData.userId);
        setAdminData(response.admins || []);
        setFilteredAdmins(response.admins || []);
      } catch (error) {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [loadData]);

  useEffect(() => {
    let result = [...adminData];

    if (searchText) {
      result = result.filter(
        (admin) =>
          (admin.displayName || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          (admin.email || "").toLowerCase().includes(searchText.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortKey] || "";
      const bValue = b[sortKey] || "";
      if (sortKey === "createdOn" || sortKey === "signedUpAt") {
        return new Date(bValue) - new Date(aValue);
      }
      return aValue.toString().localeCompare(bValue.toString());
    });

    setFilteredAdmins(result);
  }, [adminData, searchText, sortKey]);

  const handleEdit = (adminId) => {
    navigate(`/admin/subadmins-management/edit/${adminId}`);
  };

  const handleDelete = async (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        const response = await deleteSubAdmin(adminId);
        toast.success(response.message);
        setLoadData(!loadData);
      } catch {
        toast.error("Failed to delete admin");
      }
    }
  };

  const handleToggleBlock = async (adminId) => {
    try {
      const response = await blockAndUnblockUser({ userId: adminId });
      toast.success(response.message);
      setLoadData(!loadData);
    } catch {
      toast.error("Failed to update admin status");
    }
  };

  const handleResetPassword = (adminId) => {
    setSelectedAdminId(adminId);
    setShowResetModal(true);
  };

  const submitPasswordReset = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      await resetAdminPassword(selectedAdminId, { password: newPassword });
      toast.success(`Password reset successful.`, { autoClose: 3000 });
      setShowResetModal(false);
      setNewPassword("");
      setSelectedAdminId(null);
      setLoadData((prev) => !prev);
    } catch {
      toast.error("Failed to reset password");
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedAdmins([]);
    } else {
      let ids = filteredAdmins.map((c) => (c.isSuperAdmin === false ? c._id : null));
      ids = ids.filter((id) => id !== null);
      setSelectedAdmins(ids);
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      await bulkDeleteSubAdmin(selectedAdmins);
      toast.success("Selected SubAdmin deleted successfully", {
        autoClose: 3000,
        onClose: () => window.location.reload(),
      });
      setSelectedAdmins([]);
      setSelectAll(false);
      setBulkDelete(false);
    } catch (error) {
      toast.error("Failed to delete selected admins");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (adminId) => {
    setSelectedAdmins((prev) =>
      prev.includes(adminId) ? prev.filter((id) => id !== adminId) : [...prev, adminId]
    );
  };

  const handleDeleteClick = () => setBulkDelete(true);

  return (
    <Container>
      <HeaderRow>
        <Title>
          Admins <small>({filteredAdmins.length})</small>
        </Title>

        <SortByContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="displayName">Name</option>
            <option value="signedUpAt">Created On</option>
            <option value="role">Role</option>
          </SortSelect>
        </SortByContainer>
      </HeaderRow>

      {/* Controls row: responsive search + buttons */}
      <ControlsRow>
        <SearchWrapper>
          <SearchIcon>
            <CiSearch size={18} />
          </SearchIcon>
          <SearchInput
            placeholder="Search admin by name or email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchWrapper>

        <ButtonBar>
          <CreateButton onClick={() => navigate("/admin/subadmins-management/create")}>
            Add Admin
          </CreateButton>

          {selectedAdmins.length > 0 && (
            <CreateButton
              onClick={handleDeleteClick}
              style={{ background: "red" }}
              aria-label="Delete Selected"
              title="Delete Selected"
            >
              Delete Selected ({selectedAdmins.length})
            </CreateButton>
          )}
        </ButtonBar>
      </ControlsRow>

      {loading ? (
        <div>Loading admins...</div>
      ) : (
        <TableWrapper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableHeader>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                </TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Created On</TableHeader>
                <TableHeader>Block Status</TableHeader>
                <TableHeader>Delete</TableHeader>
                <TableHeader>Password Reset</TableHeader>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <TableRow key={admin._id || admin.id}>
                    <TableCell>
                      {admin.isSuperAdmin ? null : (
                        <input
                          type="checkbox"
                          checked={selectedAdmins.includes(admin._id)}
                          onChange={() => handleCheckboxChange(admin._id)}
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      <a
                        style={{ textDecoration: "none" }}
                        href="#"
                        onClick={() =>
                          navigate(`/admin/subadmins-management/edit/${admin._id}`)
                        }
                      >
                        {admin.displayName || "N/A"}
                      </a>
                    </TableCell>

                    <TableCell>{admin.email || "N/A"}</TableCell>
                    <TableCell>{admin.role || "N/A"}</TableCell>
                    <TableCell>
                      {admin.signedUpAt
                        ? new Date(admin.signedUpAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>

                    <TableCell>
                      <ToggleSwitch>
                        <input
                          type="checkbox"
                          checked={admin.isBlocked}
                          style={{ display: "none" }}
                          onChange={() => handleToggleBlock(admin._id)}
                        />
                        <ToggleSlider $isPublished={admin.isBlocked} />
                        <ToggleLabel $isPublished={admin.isBlocked}>
                          {admin.isBlocked ? "Yes" : "No"}
                        </ToggleLabel>
                      </ToggleSwitch>
                    </TableCell>

                    <TableCell>
                      {admin.isSuperAdmin ? null : (
                        <ActionsContainer>
                          <RiDeleteBin6Line
                            size={20}
                            title="Delete"
                            color="#FB4F4F"
                            onClick={() => handleDelete(admin._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </ActionsContainer>
                      )}
                    </TableCell>

                    <TableCell>
                      {admin.isSuperAdmin
                        ? admin._id === userId && (
                            <ResetPasswordButton onClick={() => handleResetPassword(admin._id)}>
                              Reset Password
                            </ResetPasswordButton>
                          )
                        : (
                          <ResetPasswordButton onClick={() => handleResetPassword(admin._id)}>
                            Reset Password
                          </ResetPasswordButton>
                        )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} style={{ textAlign: "center" }}>
                    No admins found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      )}

      {showResetModal && (
        <ResetPasswordModalOverlay>
          <ModalBackdrop onClick={() => setShowResetModal(false)} />
          <ResetPasswordModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Reset Password</ModalTitle>
            <label htmlFor="reset-password">New Password</label>
            <div style={{ position: "relative" }}>
              <ResetPasswordInput
                type={showPassword ? "text" : "password"}
                id="reset-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <ModalActions>
              <ModalButton
                $variant="cancel"
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  setNewPassword("");
                  setSelectedAdminId(null);
                }}
              >
                Cancel
              </ModalButton>
              <ModalButton type="button" onClick={submitPasswordReset}>
                Submit
              </ModalButton>
            </ModalActions>
          </ResetPasswordModalContent>
        </ResetPasswordModalOverlay>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {BulkDelete && (
        <DeleteModal
          isOpen={BulkDelete}
          onClose={() => setBulkDelete(false)}
          onDelete={handleBulkDelete}
        />
      )}
    </Container>
  );
}
