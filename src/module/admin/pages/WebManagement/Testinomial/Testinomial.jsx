import React, { useState } from 'react';
import {
  Container,
  Form,
  Input,
  TableWrapper,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  ViewLink,
  IconButton,
  Pagination,
  PaginationButton,
  BtnTitle,
  AddTestButton,
} from './Testinomial.styles';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

// Dummy testimonial data
const dummyTestimonials = Array.from({ length: 10 }, (_, i) => ({
  course: 'CLAT Coaching',
  testimonial:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  student: 'Gaurav N',
  date: '24-07-2024',
  time: '16:22',
}));

const Testimonial = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(dummyTestimonials.length / itemsPerPage);

  const paginatedTestimonials = dummyTestimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
          <BtnTitle>
            <AddTestButton>
              <FaPlus size={12} /> Testinomial
            </AddTestButton>
          </BtnTitle>
    <Container>
      <Form>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          placeholder="write here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <Input
          as="textarea"
          id="description"
          placeholder="Write here"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form>

      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Course</TableHeader>
              <TableHeader>Testimonial</TableHeader>
              <TableHeader>Student</TableHeader>
              <TableHeader>View Image/Video</TableHeader>
              <TableHeader>Date Updated</TableHeader>
              <TableHeader>Approve</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {paginatedTestimonials.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.testimonial}</TableCell>
                <TableCell>{item.student}</TableCell>
                <TableCell>
                  <ViewLink href="#">View</ViewLink>
                </TableCell>
                <TableCell>
                  {item.date} {item.time}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <FaCheckCircle color="green" />
                  </IconButton>
                  <IconButton>
                    <FaTrash color="red" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <Pagination>
        <span>
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, dummyTestimonials.length)} from{' '}
          {dummyTestimonials.length}
        </span>

        <div>
          <PaginationButton onClick={() => handlePageChange(currentPage - 1)}>
            ◀
          </PaginationButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationButton
              key={i}
              active={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </PaginationButton>
          ))}
          <PaginationButton onClick={() => handlePageChange(currentPage + 1)}>
            ▶
          </PaginationButton>
        </div>
      </Pagination>
    </Container>
    </>
  );
};

export default Testimonial;
