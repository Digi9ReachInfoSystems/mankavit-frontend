// src/pages/Admin/SocialMedia/SocialMedia.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  FormGroup,
  Label,
  TextInput,
  SubmitButton,
  ErrorText,
  SuccessText
} from './SocialMedia.styles';
import { updateSocialMediaLinks, getSocialMediaLinks } from '../../../../../api/youtuubeApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getSocialMediaLinks();
        const data = Array.isArray(response.data) ? response.data[0] : response.data || {};
        setLinks(prev => ({
          ...prev,
          youtubeChannel: data.youtubeChannel || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
          Whatsapp: data.Whatsapp || '',
          linkedin: data.linkedin || '',
          teligram: data.teligram || ''
        }));
      } catch (err) {
        console.error('Failed to load social media links', err);
        toast.error('Could not load current links');
      } finally {
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
    try {
      const response = await updateSocialMediaLinks(links);
      if (response.success) {
        toast.success('Social media links updated successfully!');
      } else {
        toast.error(response.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating social media links', err);
      toast.error(
        err.response?.data?.message ||
        err.message ||
        'Failed to update social media links'
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
      <ToastContainer position="top-right" autoClose={3000} />

      <h2>Add or Update Social Media Links</h2>

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
