import React, { useEffect, useState } from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './AllSubjects.styles';
import { getSubjects } from '../../../../../api/subjectApi';

const AllSubjects = () => {
  // const data = Array(5).fill(null).map((_, index) => (  {
  //   id: 10,
  //   subjectName: "CLAT Coaching",
  //   internalName: "Anuja Admin",
  //   mockTestCount: 12,
  //   activeCoursesCount: 12,
  // }));
  const [ subjects, setSubjects ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        // setSubjects(response.data.data);
        if(response && Array.isArray(response.data?.data)) {
          setSubjects(response.data.data);
        }else if(Array.isArray(response.data)) {
          setSubjects(response.data);
        }else {
          setSubjects([]);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
const ITEMS_PER_PAGE = 5;
  return (
    <TableWrapper>
      <StyledTable>
        <thead className="table-header">
          <TableHead>
              <TableHeader>Subject Name</TableHeader>
              <TableHeader>Internal Name</TableHeader>
              <TableHeader>No. of Mock Test</TableHeader>
              <TableHeader>Active Courses</TableHeader>
          </TableHead>
        </thead>
        <tbody>
          {subjects.slice(0, ITEMS_PER_PAGE).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.subjectName}</TableCell>
              <TableCell>{row.subjectDisplayName}</TableCell>
                <TableCell>
                  {row.mockTests.length}
                  {/* <a href="#view">View</a> */}
                </TableCell>
                <TableCell>
                  {row.courses.length}
                  {/* <a href="#view">View</a> */}
                </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AllSubjects;
