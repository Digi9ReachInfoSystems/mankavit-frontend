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
        <Input type="text" placeholder="Write title here" />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Textarea placeholder="Write description here"/>
      </FormGroup>
      
      <Button>Update changes</Button>
    </Container>
  );
};

export default WhyMankavit;
