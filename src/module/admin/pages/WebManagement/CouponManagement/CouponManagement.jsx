import React, { useState, useEffect } from "react";
import {
    Container,
    HeaderRow,
    Title,
    SortByContainer,
    SortLabel,
    TableWrapper,
    StyledTable,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    ActionsContainer,
    ButtonContainer,
    CreateButton,
    SearchWrapper,
    SearchIcon,
    SearchInput,
    CloseButtonContainer
} from "./CouponManagement.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";
import Pagination from "../../../component/Pagination/Pagination";
import CustomModal from "../../../component/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import { Select, Switch } from "antd";
import {
    getAllCoupon,
    deleteCoupon,
    updateCoupon,
    bulkDeleteCoupon,
    activateOrDeactivateCoupon
} from "../../../../../api/couponApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "../../../../../utils/authService";
import { set } from "date-fns";


const ITEMS_PER_PAGE = 10;

export default function CouponManagement() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Latest");
    const [currentPage, setCurrentPage] = useState(1);

    // derived state
    const [filteredData, setFilteredData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [TOTAL_ENTRIES, setTOTAL_ENTRIES] = useState(0);

    // delete modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    // detail modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalData, setModalData] = useState([]);
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
    const [loadData, setLoadData] = useState(false);

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

    useEffect(() => {
        fetchCoupons();
    }, []);
    useEffect(() => {
        fetchCoupons();
    }, [loadData]);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const response = await getAllCoupon();
            console.log("response", response);
            const couponsArray = response.coupons || [];

            const couponData = couponsArray.map((item) => ({
                id: item._id,
                couponName: item.coupon_name,
                couponCode: item.coupon_code,
                description: item.coupon_des,
                discount: item.discount_amount,
                startDate: item.start_date,
                endDate: item.end_date,
                couponType: item.coupon_type,
                userList: item.user_list || [],
                appliedUsers: item.applied_users || [],
                isActive: item.is_active,
                image: item.coupon_image,
                createdAt: item.created_time
            }));
            console.log("couponData", couponData);

            setData(couponData);
        } catch (error) {
            console.error("Error fetching coupons:", error);
            toast.error("Failed to fetch coupons");
        } finally {
            setLoading(false);
        }
    };

    // sort / search / paginate
    useEffect(() => {
        let processed = [...data];

        // Sort
        if (sortOption === "Latest") {
            processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            processed.sort((a, b) => a.couponName.localeCompare(b.couponName));
        }

        // Search
        if (searchText) {
            processed = processed.filter(c =>
                c.couponName.toLowerCase().includes(searchText.toLowerCase()) ||
                c.couponCode.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Pagination
        const total = processed.length;
        const pages = Math.ceil(total / ITEMS_PER_PAGE);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const items = processed.slice(start, start + ITEMS_PER_PAGE);
        console.log(" testing ", items);
        setFilteredData(processed);
        setTOTAL_ENTRIES(total);
        setTotalPages(pages);
        setCurrentItems(items);
    }, [data, sortOption, searchText, currentPage]);

    const handleDeleteClick = (id) => {
        setSelectedCoupon(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCoupon(selectedCoupon);
            toast.success("Coupon deleted successfully");
            await fetchCoupons();
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        } finally {
            setDeleteModalOpen(false);
            setSelectedCoupon(null);
        }
    };

    const handleActivateToggle = async (id, checked) => {
        if (readOnlyPermissions) {
            toast.error("You don't have permission to change activation status");
            return;
        }


        try {
            const response = await activateOrDeactivateCoupon(id);
            toast.success(response.message);
            setLoadData(!loadData);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update activation status");
            // rollback
            //   setData(d => d.map(c => c.id === id ? { ...c, isActive: !checked } : c));
        }
    };

    const openModal = (type, data) => {
        setModalType(type);
        setModalData(Array.isArray(data) ? data : []);
        setModalOpen(true);
    };

    const formatToIST = (iso) =>
        new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }).format(new Date(iso));

    const handleBulkDeleteClick = () => {
        setBulkDeleteModalOpen(true);
    };

    const handleCheckboxChange = (couponId) => {
        setSelectedCoupons(prev =>
            prev.includes(couponId)
                ? prev.filter(id => id !== couponId)
                : [...prev, couponId]
        );
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedCoupons([]);
        } else {
            setSelectedCoupons(currentItems.map(c => c.id));
        }
        setSelectAll(!selectAll);
    };

    const handleBulkDelete = async () => {
        try {
            setLoading(true);
            await bulkDeleteCoupon(selectedCoupons);
            toast.success("Selected coupons deleted successfully");
            setSelectedCoupons([]);
            setSelectAll(false);
            await fetchCoupons();
        } catch (error) {
            console.error("Bulk delete failed:", error);
            toast.error("Failed to delete selected coupons");
        } finally {
            setBulkDeleteModalOpen(false);
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
            {
                !readOnlyPermissions && (
                    <ButtonContainer>
                        <CreateButton onClick={() => navigate("/admin/web-management/coupon/create")}>
                            Add Coupon
                        </CreateButton>
                    </ButtonContainer>
                )
            }


            <Container>
                <HeaderRow>
                    <Title>
                        All Coupons <span>({currentItems.length}/{TOTAL_ENTRIES})</span>
                    </Title>
                    <SortByContainer>
                        <SortLabel>Sort by:</SortLabel>
                        <Select
                            value={sortOption}
                            onChange={(v) => { setSortOption(v); setCurrentPage(1); }}
                            options={[
                                { value: "Latest", label: "Latest" },
                                { value: "Name", label: "Name" },
                            ]}
                            style={{ width: 120 }}
                        />
                    </SortByContainer>
                </HeaderRow>

                <ButtonContainer>
                    {selectedCoupons.length > 0 && (
                        <CreateButton
                            onClick={handleBulkDeleteClick}
                            style={{ backgroundColor: 'red', marginLeft: '10px' }}
                        >
                            Delete Selected ({selectedCoupons.length})
                        </CreateButton>
                    )}
                </ButtonContainer>

                <SearchWrapper>
                    <SearchIcon>
                        <CiSearch size={18} />
                    </SearchIcon>
                    <SearchInput
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search by name or code"
                        style={{color: "black"}}
                    />
                </SearchWrapper>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <TableWrapper>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        {!readOnlyPermissions && (
                                            <TableHeader>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAllChange}
                                                />
                                            </TableHeader>
                                        )}
                                        <TableHeader>Coupon Name</TableHeader>
                                        <TableHeader>Code</TableHeader>
                                        <TableHeader>Discount</TableHeader>
                                        <TableHeader>Type</TableHeader>
                                        <TableHeader>Eligible Users</TableHeader>
                                        <TableHeader>Used By</TableHeader>
                                        <TableHeader>Valid From</TableHeader>
                                        <TableHeader>Valid To</TableHeader>
                                        <TableHeader>Status</TableHeader>
                                        {/* <TableHeader>Actions</TableHeader> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentItems.map((c) => (
                                        <TableRow key={c.id}>
                                            {!readOnlyPermissions && (
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCoupons.includes(c.id)}
                                                        onChange={() => handleCheckboxChange(c.id)}
                                                    />
                                                </TableCell>
                                            )}

                                            <TableCell>
                                                <a
                                                    href="#"
                                                    onClick={() => navigate(`/admin/web-management/coupon/edit/${c.id}`)}
                                                >
                                                    {c.couponName}
                                                </a>
                                            </TableCell>

                                            <TableCell>{c.couponCode}</TableCell>

                                            <TableCell>₹{c.discount}</TableCell>

                                            <TableCell>{c.couponType}</TableCell>

                                            <TableCell>
                                                {c.couponType === "All" ? "All" : c.userList.length}{" "}
                                                {c.couponType !== "All" && (
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openModal("eligibleUsers", c.userList);
                                                        }}
                                                    >
                                                        View
                                                    </a>
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {c.appliedUsers.length}{" "}
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal("appliedUsers", c.appliedUsers);
                                                    }}
                                                >
                                                    View
                                                </a>
                                            </TableCell>

                                            <TableCell>{formatToIST(c.startDate)}</TableCell>

                                            <TableCell>{formatToIST(c.endDate)}</TableCell>

                                            <TableCell>
                                                <Switch
                                                    checked={c.isActive}
                                                    onChange={(ch) => handleActivateToggle(c.id, ch)}
                                                />
                                            </TableCell>

                                            {/* <TableCell>
                        <ActionsContainer>
                          <IoEyeOutline
                            size={20}
                            onClick={() => navigate(`/admin/coupon-management/view/${c.id}`)}
                          />
                          <BiEditAlt
                            size={20}
                            onClick={() => navigate(`/admin/coupon-management/edit/${c.id}`)}
                          />
                          <RiDeleteBin6Line
                            size={20}
                            color="#fb4f4f"
                            onClick={() => handleDeleteClick(c.id)}
                          />
                        </ActionsContainer>
                      </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </TableWrapper>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={TOTAL_ENTRIES}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </>
                )}

                <DeleteModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={handleConfirmDelete}
                />

                <DeleteModal
                    isOpen={bulkDeleteModalOpen}
                    onClose={() => setBulkDeleteModalOpen(false)}
                    onDelete={handleBulkDelete}
                />

                {modalOpen && (
                    <CustomModal
                        title={modalType === "eligibleUsers" ? "Eligible Users" : "Applied Users"}
                        data={modalData}
                        type={modalType === "eligibleUsers" ? "students" : "students"}
                        onClose={() => setModalOpen(false)}
                    />
                )}
            </Container>
        </>
    );
}