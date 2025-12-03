import styled from "styled-components";

/** Overall container for the form */
export const Container = styled.div`
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
    margin: 0;
  }
`;

/** Title at the top of the form */
export const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  margin-top: 0;
  color: ${(props) => props.theme.colors.primary};
`;

/** The overall form element */
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

/** A row that divides into two columns (on desktop) */
export const FormRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(3)};
  align-items: flex-start;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
  @media (max-width: 768px) {
    padding-bottom: calc(env(safe-area-inset-bottom, 16px) + 60px);
  }
`;

/** Each column in a row */
export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};

  @media (max-width: 990px) {
    width: 100%;
  }
`;

/** Wrapper for a single field */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(2)};
`;

/** Labels for inputs */
export const Label = styled.label`
  font-weight: normal;
  margin-bottom: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.colors.black};
  font-size: 0.9rem;
`;

/** Standard text input styling */
export const Input = styled.input`
  padding: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.test};
  font-family: ${(props) => props.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

/** Hidden file input to trigger on area click */
export const FileInput = styled.input`
  display: none;
`;

/** A placeholder for an upload icon or text inside the drop zone */
export const UploadPlaceholder = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

/** The big action button at the bottom */
export const SubmitButton = styled.button`
  width: 20%;
  background: linear-gradient(to right, #0dcaf0, #007bff);
  color: ${(props) => props.theme.colors.secondary};
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.body};
  transition: background-color 0.2s ease;
  margin-top: ${(props) => props.theme.spacing(2)};

  @media (max-width: 1320px) {
    width: 40%;
  }

  @media (max-width: 990px) {
    width: 85%;
    margin: 0 auto;
  }
`;

/** Checkbox area styling */
export const CheckboxSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing(1)};
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CheckboxSectionTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  margin: 0 0 ${(props) => props.theme.spacing(1)} 0;
  color: ${(props) => props.theme.colors.backgrounGrey};
  background-color: ${(props) => props.theme.colors.dimGray};
  padding: ${(props) => props.theme.spacing(1)};
  border-radius: 6px;
`;

export const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(1)};
  overflow-y: auto;
  max-height: 220px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.black};
  padding: ${(props) => props.theme.spacing(1)};
`;

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

/** Subjects list layout */
export const SubjectsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SelectedSubjectsContainer = styled.div`
  flex: 1;
  padding: 0.5rem;
  background: #f9f9f9;
`;

export const SelectedSubjectItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const SubjectName = styled.span`
  font-size: 0.9rem;
`;

/* UploadArea: flex container that constrains children and clips overflow */
export const UploadArea = styled.div`
  border: 2px dashed ${(props) => props.theme.colors.grey};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(4)};
  text-align: center;
  color: ${(props) => props.theme.colors.test};
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;

  p { margin: ${(props) => props.theme.spacing(1)} 0 0 0; }

  &:hover {
    background-color: ${(props) => props.theme.colors.backgrounGrey};
  }

  @media (max-width: 1024px) {
    padding: ${(props) => props.theme.spacing(3)};
  }

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing(2)};
    min-height: 140px;
  }
`;

/* VideoWrapper: bounding box. video/iframe/canvas inside are forced to fit */
export const VideoWrapper = styled.div`
  width: 100%;
  max-height: 420px;
  display: block;
  box-sizing: border-box;
  border-radius: 6px;
  overflow: hidden;
  position: relative;

  /* make the inner media fill this wrapper while respecting aspect */
  video,
  iframe,
  canvas {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain; /* contain avoids cropping on small screens */
    display: block;
  }

  @media (max-width: 768px) {
    max-height: 40vh;
    video,
    iframe,
    canvas {
      max-height: 40vh !important;
    }
  }

  @media (max-width: 420px) {
    max-height: 32vh;
    video,
    iframe,
    canvas {
      max-height: 32vh !important;
    }
  }
`;

/* If you use a plain <video> element anywhere else */
export const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  max-height: 420px;
  object-fit: contain;
  display: block;
`;
