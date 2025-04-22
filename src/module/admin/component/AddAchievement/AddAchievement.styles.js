import styled from 'styled-components';

export const Container = styled.div`
//   max-width: 800px;
  padding: 2rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  margin-left: 40px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
      }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const Label = styled.label`
  display: block;
  margin: 1.2rem 0 0.4rem;
  font-size: 14px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  height: 80px;
  resize: none;
  box-sizing: border-box;
`;

export const DropZone = styled.div`
  border: 2px dashed #ccc;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 0.5rem;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const ImageIcon = styled.div`
  color: #007bff;
  margin-bottom: 0.5rem;
`;

export const DropZoneText = styled.div`
  font-size: 14px;
  color: #777;
`;

export const AddImageText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #007bff;
  margin-top: 0.5rem;
`;

export const UploadButton = styled.button`
  margin-top: 2rem;
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;


  &:hover {
    background-color: #0056b3;
  }
`;
