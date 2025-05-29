import React, { useEffect, useState } from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './AllTests.styles';
import { getAllMocktest } from '../../../../../api/mocktestApi';

const AllTests = () => {
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getAllMocktest();
     
        // More flexible data extraction
        const apiData = response?.data?.data || response?.data || [];
    
        if (Array.isArray(apiData) && apiData.length > 0) {
          const transformedData = apiData.map(test => ({
            id: test._id,
            courseName: test.title || 'Untitled Test',
            internalName: test.subject?.subjectDisplayName 
                         || test.subject?.subjectName 
                         || 'General',
            // subjects: test.subject ? 1 : 0,
            // mockTests: 1,
            studentsEnrolled: test.enrolledStudents 
                            || test.studentsEnrolled 
                            || (test.questions?.length || 0), // Fallback
            duration: test.duration || 'N/A',
             totalMarks: typeof test.totalMarks === 'number' ? test.totalMarks : 'N/A',
              passingMarks: typeof test.passingMarks === 'number' ? test.passingMarks : 'N/A',
          }));
          
         
          setTestData(transformedData);
        } else {
          console.warn("No test data found in response");
          setTestData([]);
        }
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to load mock tests');
        setTestData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return <div className="loading">Loading tests...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (testData.length === 0) {
    return (
      <div className="empty-state">
        No mock tests available. 
        {testData.length === 0 && !loading && (
          <div>API returned empty data set</div>
        )}
      </div>
    );
  }

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>Test Title</TableHeader>
            <TableHeader>Subject</TableHeader>
            <TableHeader>Enrollments</TableHeader>
            <TableHeader>Duration</TableHeader>
              <TableHeader>Total marks</TableHeader>
            <TableHeader>Passing marks</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {testData.slice(0,5).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.internalName}</TableCell>
              <TableCell>{row.studentsEnrolled}</TableCell>
              <TableCell>{row.duration} mins</TableCell>
                 <TableCell>{row.totalMarks}</TableCell>
              <TableCell>{row.passingMarks}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AllTests;