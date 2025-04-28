import React from "react";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  ConfirmButton,
  MocktestList,
  MocktestItem
} from "./CustomModal.styles";

const CustomModal = ({ title, type, data = [], onClose, onConfirm }) => {
  const getEmptyMessage = () => {
    if (type === "mockTests") return "No mock tests available.";
    if (type === "activeCourses") return "No active courses available.";
    if (type === "subjects") return "No subjects available.";
    if (type === "students" || type === "enrolled") return "No students available.";
    return "No data available.";
  };

  const renderList = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return <MocktestItem>{getEmptyMessage()}</MocktestItem>;
    }
  
    if (type === "students" || type === "enrolled") {
      return data.map((student, index) => (
        <MocktestItem key={index}>{student.name}</MocktestItem>
      ));
    }
  
    return data.map((item, index) => (
      <MocktestItem key={index}>{item}</MocktestItem>
    ));
  };
  

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <MocktestList>{renderList()}</MocktestList>
        </ModalBody>
        <ModalFooter>
          <CloseButton onClick={onClose}>Close</CloseButton>
          {onConfirm && <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default CustomModal;
