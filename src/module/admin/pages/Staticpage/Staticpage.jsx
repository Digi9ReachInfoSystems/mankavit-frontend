import React from 'react';
import {
  Container,
  Title,
  FormGroup,
  Label,
//   Input,
  Textarea,
  Button,
} from './Staticpage.styles';

const Staticpage = () => {
  return (
    <Container>
      <Title>Static page</Title>
      <FormGroup>
        <Label>Privacy Policy</Label>
        <Textarea type="text" placeholder="Write here" />
      </FormGroup>
      <FormGroup>
        <Label>Terms and Condition</Label>
        <Textarea placeholder="Write here" />
      </FormGroup>
      
      <Button>Update changes</Button>
    </Container>
  );
};

export default Staticpage;
