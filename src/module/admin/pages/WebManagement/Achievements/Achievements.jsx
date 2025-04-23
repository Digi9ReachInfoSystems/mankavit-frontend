import React, { useState } from "react";
import {
  Container,
  Input,
  TextArea,
  TableWrapper,
  Table,
  Th,
  Td,
  ViewLink,
  BtnAchieve,
  AddButton,
  Label
} from "./Achievements.styles";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/Pagination/Pagination"; // This is your component
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../../component/DeleteModal/DeleteModal";


const testimonials = Array.from({ length: 10 }, (_, i) => ({
  rank: `AIR ${i + 1}`,
  exam: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  student: `Gaurav ${i + 1}`,
  date: "24-07-2024",
  time: "16:22",
  showcase: true,
}));

const ITEMS_PER_PAGE = 5;

const Achievements = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(testimonials);
  const [Modal, setModal] = useState(false);

  const navigate = useNavigate();

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedTestimonials = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddButton = () => {
    navigate("/admin/web-management/achievement/create");
  };

  const handleDelete = () => {
    setModal(true);
  }

  return (
    <>
      <BtnAchieve>
        <AddButton onClick={handleAddButton}>
           Add Achievement
        </AddButton>
      </BtnAchieve>

      <Container>
        <h3>Achievement</h3>
        <Label>Title</Label>
        <Input
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>Description</Label>
        <TextArea
          placeholder="Enter description"
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
                    <BiEditAlt size={20} color="#000000" style={{cursor: "pointer"}}/>
                    <RiDeleteBin6Line size={20} color="#FB4F4F" onClick={handleDelete} style={{cursor: "pointer"}}/>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={data.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Container>

        {Modal && (
          <DeleteModal
            isOpen={Modal}
            onClose={() => setModal(false)}
            onDelete={() => {
              console.log("Item deleted");
              setModal(false);
            }}
          />
        )}
      
    </>
  );
};

export default Achievements;
