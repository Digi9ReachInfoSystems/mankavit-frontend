// AddSocialLinksForm.jsx
import React, { useState } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  SubmitButton
} from '../StaticPage/StaticPage.style'; // adjust path to your style.js

const StaticPage = ({ initialLinks = {}, onSubmit }) => {
  const [links, setLinks] = useState({
    youtube: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    twitter: '',
    other: '',
    ...initialLinks
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(links);
  };

  return (
    <Container>
      <h2>Add Social Media Links</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="youtube">Youtube Link</Label>
          <TextInput
            id="youtube"
            name="youtube"
            placeholder="Paste youtube link here"
            value={links.youtube}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="linkedin">Linkedin Link</Label>
          <TextInput
            id="linkedin"
            name="linkedin"
            placeholder="Paste linkedin link here"
            value={links.linkedin}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="instagram">Instagram Link</Label>
          <TextInput
            id="instagram"
            name="instagram"
            placeholder="Paste instagram link here"
            value={links.instagram}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="facebook">Facebook Link</Label>
          <TextInput
            id="facebook"
            name="facebook"
            placeholder="Paste facebook link here"
            value={links.facebook}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="twitter">Twitter Link</Label>
          <TextInput
            id="twitter"
            name="twitter"
            placeholder="Paste twitter link here"
            value={links.twitter}
            onChange={handleChange}
          />
        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="other">Other Links</Label>
          <TextInput
            id="other"
            name="other"
            placeholder="Paste olink here"
            value={links.other}
            onChange={handleChange}
          />
        </FormGroup> */}

        <SubmitButton type="submit">Update Changes</SubmitButton>
      </form>
    </Container>
  );
};

export default StaticPage;
