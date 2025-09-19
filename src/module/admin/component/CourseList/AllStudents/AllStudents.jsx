import React, { useEffect, useState } from 'react';
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableRow,
  TableHeader,
  TableCell
} from './AllStudents.styles';
import { getAllStudents } from '../../../../../api/userApi';

const AllStudents = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getAllStudents();
        // // console.log("Fetched students data:", response);
        
        // Correctly access the students array from the response
        const rawStudents = response?.data?.students || [];
        
        const students = rawStudents.map(user => {
          let lastActive = '-';
          if (Array.isArray(user.subscription) && user.subscription.length > 0) {
            const latest = user.subscription[user.subscription.length - 1];
            const dateVal = latest.created_at?.$date || latest.created_at;
            lastActive = dateVal
              ? new Date(dateVal).toLocaleString()
              : '-';
          }

          const isActive = Array.isArray(user.subscription)
            ? user.subscription.some(sub => sub.is_subscription_active)
            : false;

          return {
            id: user._id,
            name: user.displayName || '-',
            phone: user.phone || '-',
            email: user.email || '-',
            subjectsEnrolled: Array.isArray(user.subscription)
              ? user.subscription.length
              : 0,
            lastActive,
            kycStatus: user.kyc_status || 'pending',
            status: isActive ? 'Active' : 'Inactive'
          };
        });
        
        setStudentData(students);
      } catch (error) {
        // console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>Student Name</TableHeader>
            <TableHeader>Contact Details</TableHeader>
             <TableHeader>Phone number</TableHeader>
            <TableHeader>Subjects Enrolled</TableHeader>
           
            <TableHeader>KYC Status</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {studentData.slice(0,5).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
               
                <small>{row.email}</small>
              </TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                {row.subjectsEnrolled}
              </TableCell>
              {/* <TableCell>{row.lastActive}</TableCell> */}
              <TableCell>{row.kycStatus}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AllStudents;