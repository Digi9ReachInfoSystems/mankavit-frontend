import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
    padding: 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalBody = styled.div`
    padding: 16px;
`;

export const ModalFooter = styled.div`
    padding: 16px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
`;

export const RatingContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Star = styled.span`
    font-size: 45px;
    color: ${props => props.active ? '#ffc107' : '#e4e5e9'};
    cursor: pointer;
    margin: 0 5px;
    transition: color 0.2s;
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    box-sizing: border-box;
`;

export const SubmitButton = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 34px;
    cursor: pointer;
    color: #666;
`;
export const FormGroup = styled.div`
    margin-bottom: 15px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
`;

export const TextInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
`;