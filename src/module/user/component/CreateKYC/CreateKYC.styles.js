import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: 600;
  color: #1e1e1e;
  display: flex;
  align-items: center;

  .tick-icon {
    font-size: 24px;
    margin-right: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  label {
    flex: 0.3;
  }

  input {
    flex: 0.7;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const RedDot = styled.span`
  color: red;
  font-size: 18px;
  vertical-align: middle;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
`;

export const DisabledInput = styled(Input)`
  background-color: #f2f2f2;
  cursor: not-allowed;
`;

export const UploadGroup = styled.div`
  margin: 25px 0;
`;

export const UploadLabel = styled(Label)`
  display: block;
  margin-bottom: 10px;
`;

export const UploadInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;

  span {
    font-size: 16px;
    color: #555;
  }
`;

export const UploadButton = styled.button`
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #005fcc;
  }
`;

export const ConfirmButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 30px;
  padding: 14px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;


export const UploadInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const UploadFileName = styled.span`
  font-size: 16px;
  color: #555;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;