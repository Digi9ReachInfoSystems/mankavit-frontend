import React, { useState, useEffect } from "react";
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
    ButtonContainer,
    CreateButton,
    SearchWrapper,
    SearchIcon,
    SearchInput,
    ToastContainer,
    ToggleSwitch,
} from "./Meeting.styles";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import Pagination from "../../component/Pagination/Pagination";
import CustomModal from "../../component/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";
import { Select, Space, DatePicker } from "antd";
import { getAllCourses, deleteCourseById } from "../../../../api/courseApi";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { bulkDeleteMeetings, getAllMeetings, updateMeetingStatus } from "../../../../api/meetingApi";
import { getCookiesData } from "../../../../utils/cookiesService";
import { getUserByUserId } from "../../../../api/authApi";
import { getAuth } from "../../../../utils/authService";
import { set } from "date-fns";



const ITEMS_PER_PAGE = 10;

export default function Meeting() {
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalData, setModalData] = useState([]);
    const [sortOption, setSortOption] = useState('Latest');
    const [filteredData, setFilteredData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [TOTAL_ENTRIES, setTotalEntries] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const { RangePicker } = DatePicker;
    const [selectedCourseFilter, setSelectedCourseFilter] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [coursesList, setCoursesList] = useState([]);
    const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
    const [superAdmin, setSuperAdmin] = useState(false);
    const [selectedMeetings, setSelectedMeetings] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);
    const [loadData, setLoadData] = useState(false);
    useEffect(() => {
        const apiCaller = async () => {
            const response = await getAuth();
            response.Permissions;
            if (response.isSuperAdmin === true) {
                setReadOnlyPermissions(false);
            } else {
                setReadOnlyPermissions(response.Permissions["meetingManagement"].readOnly);
            }
        }
        apiCaller();
    }, []);
    useEffect(() => {
        // fetchCourses();
        const apiCaller = async () => {
            const cookiesData = getCookiesData();
            const userData = await getUserByUserId(cookiesData.userId);
            console.log("userData", userData);
            if (userData.user.isSuperAdmin === true) {
                setSuperAdmin(true);
            } else {
                setSuperAdmin(false);
            }
            fetchMeetings(selectedCourseFilter, dateRange ? dateRange[0].format('YYYY-MM-DD') : null, dateRange ? dateRange[1].format('YYYY-MM-DD') : null, userData.user.email, userData.user.isSuperAdmin);

        }
        apiCaller();

    }, [selectedCourseFilter, dateRange, loadData]);
    const fetchMeetings = async (courseId = null, from = null, to = null, hostEmail, isSuperAdmin = false) => {
        try {
            const response = await getAllMeetings(courseId, from, to, hostEmail, isSuperAdmin);
            console.log("Meetings response:", response);
            const meetingData = response.map((item) => ({
                id: item._id || '',
                courses: item.course_Ref,
                meetingName: item.meeting_title,
                meetingDuration: item.meeting_duration,
                meetingDate: item.meeting_time,
                meetingNumber: item?.zoom_meeting_id,
                passWord: item?.zoom_passcode,
                meetingTitle: item?.meeting_title,
                isHostMeeting: item.isHostMeeting,
                isPastMeeting: item.isPastMeeting,
                isEnded: item.isEnded,

            }))
            // Also fetch courses list for the dropdown
            const coursesResponse = await getAllCourses();
            setCoursesList(coursesResponse.data);
            setData(meetingData);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchCourses = async () => {
        setLoading(true);
        try {

            const response = await getAllCourses();

            // Only courseName is mandatory; others are optional
            const courseData = response.data.map((item) => ({
                id: item._id || '',
                courseName: item.courseDisplayName, // Mandatory
                internalName: item.courseName || '',
                subjects: item.subjects || [],
                mockTests: item.mockTests || [],
                enrolled: item.student_enrolled || [],
                dateAndTime: item.updatedAt || new Date().toISOString(),
                students: item.student_enrolled || [],
            }));

            setData(courseData);
        } catch (error) {
            console.log("Error fetching courses:", error);
            toast.error("Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let processedData = [...data];

        // ✅ Fix: Check for "Latest"
        if (sortOption === "Latest") {
            processedData.sort((a, b) => new Date(b.meetingDate) - new Date(a.meetingDate));
        } else if (sortOption === "Name") {
            processedData.sort((a, b) => a.meetingName.localeCompare(b.meetingName));
        }

        // Filter
        if (searchText != ``) {
            processedData = processedData.filter((item) =>
                item.meetingName.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        // Pagination
        const totalEntries = processedData.length;
        const totalPagesValue = Math.ceil(totalEntries / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentPageItems = processedData.slice(startIndex, endIndex);

        // Set all states
        setFilteredData(processedData);
        setTotalEntries(totalEntries);
        setTotalPages(totalPagesValue);
        setCurrentItems(currentPageItems);
    }, [data, sortOption, searchText, currentPage]);


    const handleDeleteClick = (id) => {
        setSelectedCourse(id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCourseById(selectedCourse);
            toast.success("Data deleted successfully");
            // Refresh the course list after deletion
            await fetchCourses();
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete data. Please try again.");
        } finally {
            setDeleteModalOpen(false);
            setSelectedCourse(null);
        }
    };

    const openModal = (type, data) => {
        setModalType(type);
        setModalData(data);
        setModalOpen(true);
    };

    const formatToIST = (isoString, options = {}) => {
        try {
            const date = new Date(isoString);
            const defaultOptions = {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                ...options
            };
            return new Intl.DateTimeFormat('en-IN', defaultOptions).format(date);
        } catch (error) {
            console.error('Invalid date format:', isoString);
            return 'Invalid date';
        }
    };

    const handleViewClick = (course) => {
        navigate(`/admin/course-management/view/${course.id}`);
    };

    const handleEdit = (id) => {
        navigate(`/admin/course-management/edit/${id}`);
    };

    const getSubjectNames = (subjects) => {
        if (!subjects || subjects.length === 0) return [];
        return subjects.map(subject =>
            typeof subject === 'object' ? subject.subjectName || subject.label : subject
        );
    };

    const getStudentNames = (students) => {
        if (!students || students.length === 0) return [];
        return students.map(student => student.displayName);
    }
    const getCourseNames = (courses) => {
        if (!courses || courses.length === 0) return [];
        return courses;
    }
    // Add this function to handle filter application
    const handleApplyFilters = () => {
        const fromDate = dateRange ? dateRange[0].format('YYYY-MM-DD') : null;
        const toDate = dateRange ? dateRange[1].format('YYYY-MM-DD') : null;
        fetchMeetings(selectedCourseFilter, fromDate, toDate);
    };

    // Add this function to clear filters
    const handleClearFilters = () => {
        setSelectedCourseFilter(null);
        setDateRange(null);
        fetchMeetings();
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedMeetings([]);
        } else {
            let courseIds = currentItems.map((c) => {
                if(c.isEnded === false) return c.id
                else return null
            });
            courseIds = courseIds.filter((id) => id !== null);
            setSelectedMeetings(courseIds);
        }
        setSelectAll(!selectAll);
    };
    const handleBulkDelete = async () => {
        try {
            setLoading(true);
            await bulkDeleteMeetings(selectedMeetings);
            toast.success("Selected Meetings deleted successfully");
            setSelectedMeetings([]);
            setSelectAll(false);

        } catch (error) {
            console.error("Bulk delete failed:", error);
            toast.error("Failed to delete selected courses");
        } finally {
            setBulkDeleteModalOpen(false);
            setLoading(false);
            setLoadData(!loadData);
        }
    };
    const handleBulkDeleteClick = () => {
        setBulkDeleteModalOpen(true);
    };
    const handleCheckboxChange = (meetingId) => {
        setSelectedMeetings((prev) =>
            prev.includes(meetingId)
                ? prev.filter((id) => id !== meetingId)
                : [...prev, meetingId]
        );
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
            <ButtonContainer>
                {
                    !readOnlyPermissions &&

                    <CreateButton onClick={() => navigate("/admin/meeting-management/create")}>
                        Add Meeting
                    </CreateButton>
                }

                {selectedMeetings.length > 0 && (
                    <CreateButton
                        onClick={handleBulkDeleteClick}
                        style={{ backgroundColor: "red", marginLeft: "10px" }}
                    >
                        Delete  ({selectedMeetings.length})
                    </CreateButton>
                )}
            </ButtonContainer>


            <Container>

                <HeaderRow>
                    <Title>
                        See All Meetings{" "}
                        <span style={{ color: "#6d6e75", fontSize: "12px", fontWeight: "400" }}>
                            ({currentItems.length}/{TOTAL_ENTRIES})
                        </span>
                    </Title>

                    <SortByContainer>
                        <SortLabel>Sort by:</SortLabel>
                        <Select
                            value={sortOption}
                            style={{ width: 120 }}
                            onChange={(value) => setSortOption(value)}
                            options={[
                                { value: 'Latest', label: 'Latest' }, // Correct this line
                                { value: 'Name', label: 'Name' },
                            ]}
                        />

                    </SortByContainer>
                </HeaderRow>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                    <SearchWrapper>
                        <SearchIcon>
                            <CiSearch size={18} />
                        </SearchIcon>
                        <SearchInput
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </SearchWrapper>
                    <Space size={16} style={{ marginRight: '16px' }}>
                        <Select
                            placeholder="Filter by course"
                            style={{ width: 200 }}
                            value={selectedCourseFilter}
                            onChange={setSelectedCourseFilter}
                            options={coursesList.map(course => ({
                                value: course._id,
                                label: course.courseDisplayName
                            }))}
                            allowClear
                        />

                        <RangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            style={{ width: 300 }}
                            placeholder={['Start Date', 'End Date']}
                        />

                        <button
                            onClick={handleApplyFilters}
                            style={{
                                padding: '4px 12px',
                                backgroundColor: '#1890ff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Apply
                        </button>

                        <button
                            onClick={handleClearFilters}
                            style={{
                                padding: '4px 12px',
                                backgroundColor: '#f5f5f5',
                                color: '#666',
                                border: '1px solid #d9d9d9',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Clear
                        </button>
                    </Space>
                </div>
                {loading ? (
                    <div>Loading courses...</div>
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
                                        <TableHeader>Meeting Name</TableHeader>
                                        <TableHeader>Course Name</TableHeader>
                                        <TableHeader>Duration (mins)</TableHeader>
                                        {/* <TableHeader>No. of Mock Test</TableHeader> */}
                                        {/* <TableHeader>No. of Student </TableHeader> */}
                                        <TableHeader>Start Date and Time IST</TableHeader>
                                        <TableHeader>Meeting Ended</TableHeader>
                                        <TableHeader>Actions</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* id: item._id || '',
                courseName: item.course_ref.courseName,
                meetingName: item.meeting_title,
                meetingDuration: item.meeting_duration,
                meetingDate: item.meeting_time,
                students: item.students || [], */}
                                    {currentItems.map((item) => (
                                        <TableRow key={item.id}>
                                            {!readOnlyPermissions && (
                                                <TableCell>
                                                    {
                                                        item.isEnded ? (
                                                            <></>
                                                        ) : (
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedMeetings.includes(item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                            />
                                                        )
                                                    }

                                                </TableCell>
                                            )}
                                            <TableCell>{item.meetingName.slice(0, 30)}</TableCell>
                                            <TableCell>
                                                {getCourseNames(item.courses).length}
                                                <a href="#view"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal("courses", getCourseNames(item.courses));
                                                    }}> View</a>
                                            </TableCell>
                                            <TableCell>{item.meetingDuration}</TableCell>
                                            {/* <TableCell>
                                                {getStudentNames(item.students).length}
                                                <a href="#view"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openModal("subjects", getStudentNames(item.students));
                                                    }}> View</a>
                                            </TableCell> */}
                                            {/* <TableCell>
                                                {item.mockTests.length}
                                                <a href="#view" onClick={(e) => {
                                                    e.preventDefault();
                                                    openModal("mockTests", item.mockTests);
                                                }}> View</a>
                                            </TableCell> */}
                                            {/* <TableCell>
                                                {item.students.length}
                                                <a href="#view" onClick={(e) => {
                                                    e.preventDefault();
                                                    openModal("enrolled", item.students);
                                                }}> View</a>
                                            </TableCell> */}
                                            <TableCell>{formatToIST(item.meetingDate)}</TableCell>
                                            <TableCell>
                                                <ToggleSwitch
                                                    type="checkbox"
                                                    checked={item.isEnded}
                                                    onChange={async (e) => {
                                                        await updateMeetingStatus(item.id);
                                                        setLoadData(!loadData);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ActionsContainer>
                                                    {item.isEnded ? null :
                                                        item.isHostMeeting ?
                                                            item.isPastMeeting ?
                                                                null :
                                                                (<button

                                                                    style={{
                                                                        backgroundColor: '#2D8CFF',
                                                                        color: '#ffffff',
                                                                        padding: '12px 40px',
                                                                        borderRadius: '10px',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        fontSize: '1rem',
                                                                        fontWeight: '500',
                                                                        transition: 'background-color 0.3s',
                                                                        ':hover': {
                                                                            backgroundColor: '#1a7ae8'
                                                                        }

                                                                    }}
                                                                    onClick={async () => {
                                                                        const cookiesData = getCookiesData();
                                                                        const userData = await getUserByUserId(cookiesData.userId);
                                                                        console.log("userData", userData);
                                                                        navigate(`/admin/meeting-management/join`, {
                                                                            state: {
                                                                                // meetingNumber: item?.meetingNumber,
                                                                                // passWord: item?.passWord,
                                                                                meetingNumber: item?.meetingNumber,
                                                                                passWord: item?.passWord,
                                                                                meetingTitle: item?.meetingTitle,
                                                                                role: 1,
                                                                                userName: userData.user.displayName || "React",
                                                                                userEmail: userData.user.email || "",
                                                                                // userEmail: "mankavit.clatcoaching11@gmail.com",
                                                                                leaveUrl: `/admin/meeting-management`,
                                                                            }
                                                                        })
                                                                        // navigate(`/admin/meeting-hosting`,{
                                                                        //     state: {
                                                                        //      meetingNumber: item?.meetingNumber,
                                                                        //       passWord: item?.passWord,
                                                                        // }})
                                                                    }}
                                                                >
                                                                    Host Meeting
                                                                </button>) :
                                                            null
                                                    }


                                                    {/* <IoEyeOutline
                                                        title="View"
                                                        color="#000000"
                                                        size={20}
                                                        onClick={() => handleViewClick(item)}
                                                    />
                                                    <BiEditAlt
                                                        title="Edit"
                                                        color="#000000"
                                                        size={20}
                                                        onClick={() => handleEdit(item.id)}
                                                    />
                                                    <RiDeleteBin6Line
                                                        title="Delete"
                                                        size={20}
                                                        color="#FB4F4F"
                                                        onClick={() => handleDeleteClick(item.id)}
                                                    /> */}
                                                </ActionsContainer>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </TableWrapper>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
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
                {modalOpen && (
                    <CustomModal
                        title={
                            modalType === "subjects"
                                ? "Subjects"
                                : modalType === "mockTests"
                                    ? "Mock Tests"
                                    : modalType === "enrolled"
                                        ? "Students"
                                        : "Details"
                        }
                        type={modalType}
                        data={modalData}
                        onClose={() => setModalOpen(false)}
                    />
                )}
                <DeleteModal
                    isOpen={bulkDeleteModalOpen}
                    onClose={() => setBulkDeleteModalOpen(false)}
                    onDelete={handleBulkDelete}
                />
            </Container>
        </>
    );
}