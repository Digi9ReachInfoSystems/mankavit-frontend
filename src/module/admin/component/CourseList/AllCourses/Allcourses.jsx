import React, { useEffect, useState } from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './AllCourses.styles';
import { getAllCourses } from '../../../../../api/courseApi';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await getAllCourses();
        // Check for backend shape
        if (response && Array.isArray(response.data?.data)) {
          setCourses(response.data.data);
        } else if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setCourses([]); // fallback
        }
        setError(null);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;
  const ITEMS_PER_PAGE = 5;

  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
            <TableHeader>Course Name</TableHeader>
            <TableHeader>Internal Name</TableHeader>
            <TableHeader>No. of Subjects</TableHeader>
            <TableHeader>No. of Mock Test</TableHeader>
            <TableHeader>No. of Student Enrolled</TableHeader>
            <TableHeader>Price</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {courses.slice(0, ITEMS_PER_PAGE).map((row, index) => (
            <TableRow key={row._id || index}>
              <TableCell>{row.courseName || '-'}</TableCell>
              <TableCell>{row.courseDisplayName || '-'}</TableCell>
              <TableCell>
                {/* If row.subjects is an array, use row.subjects.length; if number, just show it */}
                {Array.isArray(row.subjects) ? row.subjects.length : row.subjects || 0}
              </TableCell>
              <TableCell>
                {Array.isArray(row.mockTests) ? row.mockTests.length : row.mockTests || 0}
              </TableCell>
              <TableCell>
                {row.studentsEnrolled !== undefined ? row.studentsEnrolled : (row.studentsEnrolledCount || 0)}
              </TableCell>
              <TableCell>
                {row.price ? (typeof row.price === 'number' ? `₹${row.price}` : row.price) : '-'}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AllCourses;
