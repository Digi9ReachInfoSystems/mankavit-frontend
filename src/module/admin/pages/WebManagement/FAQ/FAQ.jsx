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
} from './FAQ.styles';
import { FaPlus } from 'react-icons/fa';

const FAQ = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 10;

  const faqData = Array(12).fill({
    question: 'CLAT Coaching',
    answer: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    uploadedTime: '24-07-2024',
    uploadedHour: '16:00',
    showcase: true,
  });

  const totalPages = Math.ceil(faqData.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const currentFaqs = faqData.slice(startIndex, startIndex + faqsPerPage);

  return (
    <FAQContainer>
      <ButtonTitle>
        <AddButton>
          <FaPlus size={12} /> Add More FAQ
        </AddButton>
      </ButtonTitle>

      <Header>
        <h3>FAQ</h3>

        <TableWrapper>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Question</strong></TableCell>
              <TableCell><strong>Answer</strong></TableCell>
              <TableCell><strong>Uploaded Time</strong></TableCell>
              <TableCell><strong>Showcase</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentFaqs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.question}</TableCell>
                <TableCell>{item.answer}</TableCell>
                <TableCell>{item.uploadedTime} &nbsp; {item.uploadedHour}</TableCell>
                <TableCell>
                  <ToggleSwitch type="checkbox" defaultChecked={index !== 1} />
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
