import React, { useState } from 'react';
import {
  Container,
  Input,
  TextArea,
  TableWrapper,
  Table,
  Th,
  Td,
  Pagination,
  PaginationButton,
  ViewLink,
  BtnAchieve,
  AddButton,
  ToggleWrapper,
} from './Achievements.styles';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const testimonials = Array.from({ length: 10 }, (_, i) => ({
    rank: `AIR ${i + 1}`,
    exam: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    student: `Gaurav ${i + 1}`,
    date: '24-07-2024',
    time: '16:22',
    showcase: true,
  }));

const ITEMS_PER_PAGE = 6;

const Achievements = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(testimonials);

  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedTestimonials = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleShowcase = (index) => {
    const updated = [...data];
    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    updated[globalIndex].showcase = !updated[globalIndex].showcase;
    setData(updated);
  };

  const handleAddButton = () => {
    navigate('/admin/web-management/achievement/create');
  };

  return (
    <>
      <BtnAchieve>
        <AddButton onClick={handleAddButton}>
          <FaPlus size={12} /> Achievement
        </AddButton>
      </BtnAchieve>

      <Container>
        <h3>Achievement</h3>
        <Input
          placeholder="write here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Write here"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Rank</Th>
                <Th>Exam Name</Th>
                <Th>Student</Th>
                <Th>View Image/Video</Th>
                <Th>Date Updated</Th>
                <Th>Showcase</Th>
              </tr>
            </thead>
            <tbody>
              {paginatedTestimonials.map((item, index) => (
                <tr key={index}>
                  <Td>{item.rank}</Td>
                  <Td>{item.exam}</Td>
                  <Td><strong>{item.student}</strong></Td>
                  <Td><ViewLink href="#">View</ViewLink></Td>
                  <Td>{item.date} {item.time}</Td>
                  <Td>
                    <ToggleWrapper>
                      <input
                        type="checkbox"
                        checked={item.showcase}
                        onChange={() => toggleShowcase(index)}
                      />
                      <span></span>
                    </ToggleWrapper>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Pagination>
          <span>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, data.length)} from {data.length}
          </span>

          <div>
            <PaginationButton onClick={() => handlePageChange(currentPage - 1)}>◀</PaginationButton>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationButton
                key={i}
                active={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ))}
            <PaginationButton onClick={() => handlePageChange(currentPage + 1)}>▶</PaginationButton>
          </div>
        </Pagination>
      </Container>
    </>
  );
};

export default Achievements;
