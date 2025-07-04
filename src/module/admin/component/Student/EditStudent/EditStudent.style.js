import styled from 'styled-components';

export const FormContainer = styled.form`
margin-left: 40px;
margin-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing(3)};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: ${(props) => props.theme.fonts.body};
  min-height: 750px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing(2)};
  }

  @media (max-width: 768px) {
    margin:0;
}
`;

export const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 28px;
  font-weight: 600;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  margin-top: 0;
  color: ${(props) => props.theme.colors.brightblue};

  @media (max-width: 1024px) {
    font-size: 24px;
  }
`;
export const InputGroup = styled.div`
  margin-bottom: 0px;
  margin-top: 0px;
  flex: 1;
  min-width: 200px;

  @media (max-width: 1024px) {
    min-width: 100%;
    margin-top: 16px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  font-weight: 400;

    small {
    font-size: 14px;
    color: #696969; /* Dim Gray */
    font-weight: 400;
    margin-left: 5px;

    @media (max-width: 1024px) {
      font-size: 10px;
    }

    @media (max-width: 820px) {
      font-size: 10px;
    }
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 820px) {
    font-size: 12px;
  }

`;

export const InputField = styled.input`
  width: 100%;
  padding: 16px;
  font-weight: 400;
  border: ${(props) => props.theme.colors.platinumlightgray} 1px solid;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.dimGray};
  box-sizing: border-box;
`;

export const UploadSection = styled.div`
  flex: 1;
  margin-top: 30px;

  @media (max-width: 1024px) {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const UploadButton = styled.button`
  background: ${(props) => props.theme.colors.white};
  border: 1px solid #ccc;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 50%;

  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 14px;
    width: 50%;  
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.platinumlightgray};
  }
`;

export const BrowseButton = styled.button`
  background-color: ${(props) => props.theme.colors.brightblue};
  color: ${(props) => props.theme.colors.white};
  padding: 12px 20px;
  margin-left: 10px;
  border-radius: 8px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  width: 20%;

  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 14px;
    width: 40%;  
  }

  @media (max-width: 768px) {
    width: 30%;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  // justify-content: space-between;
  flex-wrap: nowrap;          /* ⬅️  keep everything on one line */

  @media (max-width: 768px) {  /* mobile: stack vertically */
    flex-direction: column;
  }
`;


export const FlexUpload = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
flex-wrap: nowrap; 
}

  @media (max-width: 820px) {
flex-wrap: nowrap; 
}

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

export const UploadedFileName = styled.div`
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

export const CourseSelection = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};

  /* For lists */
  & li:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.white};
  }

  & li:nth-child(even) {
    background-color: red;
  }
`;

export const CourseList = styled.div`
  display: flex;
  flex-direction: column;
//   flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
`;

export const CourseItem = styled.div`
  display: flex;
  align-items: center;
`;

export const CourseCheckbox = styled.input`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const CourseLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: #ff0000; // Red color for error messages
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const ReadOnlyField = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;
/* SubmitButton – just remove the top-margin so it aligns vertically */
export const SubmitButton = styled.button`
  width: 20%;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(p) => p.theme.colors.secondary};
  padding: ${(p) => p.theme.spacing(2)};
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @media (max-width: 1320px) { width: 40%; }
  @media (max-width: 1024px) { width: 35%; }
  @media (max-width: 990px)  { width: 40%; margin: 20px auto; }
  @media (max-width: 768px)  { width: 85%; margin: 15px auto; }
`;

/* LogoutButton – same break-points, different colours */
export const LogoutButton = styled.button`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.spacing(2)} 0;
  background: ${(p) => p.theme.colors.lavendargray};
  border: none;
  border-radius: ${(p) => p.theme.spacing(0.5)};
  font-size: 1rem;
  color: ${(p) => p.theme.colors.logoutButtonColor};
  cursor: pointer;
  transition: background 0.2s;

  &:hover { background: ${(p) => p.theme.colors.logoutButtonHover}; }

  @media (max-width: 1320px) { width: 40%; }
  @media (max-width: 1024px) { width: 35%; }
  @media (max-width: 990px)  { width: 40%; margin: 20px auto; }
  @media (max-width: 768px)  { width: 85%; margin: 15px auto; }
`;

/* DeleteButton (for the modal or inline use) */
export const DeleteButton = styled.button`
  width: 20%;
  background: #d32f2f;
  color: #fff;
  padding: ${(p) => p.theme.spacing(2)} 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover     { background: #b71c1c; }
  &:disabled  { background: #cccccc; cursor: not-allowed; }

  @media (max-width: 1320px) { width: 40%; }
  @media (max-width: 1024px) { width: 35%; }
  @media (max-width: 990px)  { width: 40%; margin: 20px auto; }
  @media (max-width: 768px)  { width: 85%; margin: 15px auto; }
`;


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

export const ModalWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

export const ModalContent = styled.div`
  padding: 20px;
`;

export const ModalText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
`;

export const AttemptsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableHead  = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid #ccc;
`;


export const TableCell  = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

export const PaymentModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 80%;
  max-width: 500px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;