import React, { useState } from 'react';
import {
  FAQContainer,
  Header,
  AddButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ToggleSwitch,
  ButtonTitle,
  PaginationContainer,
  PageButton,
  TableWrapper,
  TableHeader,
  ButtonContainer,
  CreateButton
} from './FAQ.styles';
import {  FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 10;

  const faqData = Array(12).fill({
    question: 'CLAT Coaching',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    uploadedTime: '24-07-2024',
    uploadedHour: '16:00',
    // showcase: true,
  });

  const totalPages = Math.ceil(faqData.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const currentFaqs = faqData.slice(startIndex, startIndex + faqsPerPage);

  return (
    <FAQContainer>
     <ButtonContainer>
        <Link to="/admin/web-management/faq/create">
          <CreateButton>Add more FAQ</CreateButton>
        </Link>
      </ButtonContainer>

      <Header>
        <h3>FAQ</h3>

        <TableWrapper>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Question</TableHeader>
              <TableHeader>Answer</TableHeader>
              <TableHeader>Uploaded Time</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentFaqs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.question}</TableCell>
                <TableCell>{item.answer}</TableCell>
                <TableCell>{item.uploadedTime} &nbsp; {item.uploadedHour}</TableCell>
                <TableCell>
                  {/* Edit/Delete icons */}
                  <FaEdit
                    style={{ cursor: 'pointer', marginRight: '12px' }}
                    onClick={() => console.log('Edit', item)}
                  />
                 <FaTrash
                   style={{ cursor: 'pointer' }}
                    onClick={() => console.log('Delete', item)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableWrapper>

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationContainer>
            {Array.from({ length: totalPages }, (_, i) => (
              <PageButton
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                active={currentPage === i + 1}
              >
                {i + 1}
              </PageButton>
            ))}
          </PaginationContainer>
        )}
      </Header>
    </FAQContainer>
  );
};

export default FAQ;
