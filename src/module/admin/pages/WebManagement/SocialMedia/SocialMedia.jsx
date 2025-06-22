import React, { useState, useEffect } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  SubmitButton,
  ErrorText,
  SuccessText
} from './SocialMedia.styles'; // Adjust path as needed
import { updateSocialMediaLinks, getSocialMediaLinks } from '../../../../../api/youtuubeApi';

const SocialMedia = () => {
  const [links, setLinks] = useState({
    youtubeChannel: '',
    facebook: '',
    instagram: '',
    twitter: '',
    Whatsapp: '',
    linkedin: '',
    teligram: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load existing links from API
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getSocialMediaLinks(); // GET request
        console.log("Social media", response);

        const data = response.data?.[0] || {}; // 👈 Get first item from array

        setLinks(prev => ({
          ...prev,
          youtubeChannel: data.youtubeChannel || prev.youtubeChannel,
          facebook: data.facebook || prev.facebook,
          instagram: data.instagram || prev.instagram,
          twitter: data.twitter || prev.twitter,
          Whatsapp: data.Whatsapp || prev.Whatsapp,
          linkedin: data.linkedin || prev.linkedin,
          teligram: data.teligram || prev.teligram
        }));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load social media links", error);
        setErrorMessage("Could not load current links");
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await updateSocialMediaLinks(links);
      if (response.success) {
        setSuccessMessage('Social media links updated successfully!');
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (err) {
      console.error("Error updating social media links", err);
      setErrorMessage(
        err.response?.data?.message ||
        err.message ||
        "Failed to update social media links"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Container>Loading social media links...</Container>;
  }

  return (
    <Container>
      <h2>Add or Update Social Media Links</h2>

      {successMessage && <SuccessText>{successMessage}</SuccessText>}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="youtubeChannel">YouTube Channel</Label>
          <TextInput
            id="youtubeChannel"
            name="youtubeChannel"
            placeholder="https://www.youtube.com/channel/..." 
            value={links.youtubeChannel}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="facebook">Facebook</Label>
          <TextInput
            id="facebook"
            name="facebook"
            placeholder="https://www.facebook.com/..." 
            value={links.facebook}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="instagram">Instagram</Label>
          <TextInput
            id="instagram"
            name="instagram"
            placeholder="https://www.instagram.com/..." 
            value={links.instagram}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="twitter">Twitter / X</Label>
          <TextInput
            id="twitter"
            name="twitter"
            placeholder="https://x.com/..." 
            value={links.twitter}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="Whatsapp">WhatsApp</Label>
          <TextInput
            id="Whatsapp"
            name="Whatsapp"
            placeholder="https://wa.me/..." 
            value={links.Whatsapp}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <TextInput
            id="linkedin"
            name="linkedin"
            placeholder="https://www.linkedin.com/company/..." 
            value={links.linkedin}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="teligram">Telegram</Label>
          <TextInput
            id="teligram"
            name="teligram"
            placeholder="https://t.me/..." 
            value={links.teligram}
            onChange={handleChange}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? 'Updating...' : 'Update Social Media Links'}
        </SubmitButton>
      </form>
    </Container>
  );
};

export default SocialMedia;