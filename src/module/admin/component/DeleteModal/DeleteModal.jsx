import React, { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalText,
  ButtonGroup,
  CancelButton,
  DeleteButton,
  CloseIcon
} from './DeleteModal.styles';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ModalHeader>
          <CloseIcon onClick={onClose}>
            <FiX size={20} />
          </CloseIcon>
        </ModalHeader>
        <ModalContent>
          <ModalText>Are you sure you want to delete this item?</ModalText>
          <ButtonGroup>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
          </ButtonGroup>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default DeleteModal;
