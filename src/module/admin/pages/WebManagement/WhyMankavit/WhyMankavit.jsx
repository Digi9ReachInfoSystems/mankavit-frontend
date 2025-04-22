import React from 'react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  Input,
  Textarea,
  Button,
} from './WhyMankavit.styles';

const WhyMankavit = () => {
  return (
    <Container>
      <Title>Why Mankavit</Title>
      <FormGroup>
        <Label>Title</Label>
        <Input type="text" placeholder="write here" />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Textarea placeholder="Write here" rows="10" />
      </FormGroup>
      
      <Button>Update changes</Button>
    </Container>
  );
};

export default WhyMankavit;
