// src/modules/admin/components/Staticpage/Staticpage.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  Textarea,
  Button,
} from './Staticpage.styles';
import {
  createStatic,
  updatestaticById,
  getAllStatic
} from '../../../../api/staticApi';
import { message } from 'antd';
import { getAuth } from '../../../../utils/authService';
import JoditEditor from 'jodit-react';

const Staticpage = () => {
  // form fields

  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [terms, setTerms] = useState('');

  // recordId tells us if we should create or update
  const [recordId, setRecordId] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  const editor = useRef(null);
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: '',
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []
  );
  const configds = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: '',
    //  buttons: ['bold', 'italic', 'underline', 'strikethrough', '|',
    //   'ul', 'ol', '|', 'font', 'fontsize', 'brush', '|',
    //   'align', 'outdent', 'indent', '|', 'link', 'image'],
    // toolbarAdaptive: false,
    // showCharsCounter: false,
    // showWordsCounter: false,
    // showXPathInStatusbar: false,
    // askBeforePasteHTML: true,
    // askBeforePasteFromWord: true,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // style: {
    //   background: '#f5f5f5',
    //   color: '#333'
    // }
  }),
    []
  );
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["staticPageManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);

  // 1) on mount, fetch any existing record
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const all = await getAllStatic();
        if (Array.isArray(all) && all.length > 0) {
          const existing = all[0];
          setRecordId(existing._id);
          setPrivacyPolicy(existing.privacy);
          setTerms(existing.terms);
        }
      } catch (err) {
        console.error("Failed to load static page:", err);
        setError("Could not load existing content.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2) handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = { privacy: privacyPolicy, terms };

    try {
      if (recordId) {
        await updatestaticById(recordId, payload);
        setSuccess("Updated successfully.");
        // message.success("Updated successfully.");
      } else {
        const created = await createStatic(payload);
        setRecordId(created._id);
        // setSuccess("Created successfully.");
        message.success("Created successfully.");
      }
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      setError("Save failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Static Page</Title>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="privacy">Privacy Policy</Label>
          <JoditEditor
            ref={editor}
            value={privacyPolicy}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => { console.log("new", newContent); }} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { setPrivacyPolicy(newContent) }}
          />
          {/* <Textarea
            id="privacy"
            rows={8}
            placeholder="Write privacy policy here"
            value={privacyPolicy}
            onChange={(e) => setPrivacyPolicy(e.target.value)}
          /> */}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="terms">Terms &amp; Conditions</Label>
           <JoditEditor
            ref={editor}
            value={terms}
            config={configds}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => { console.log("new", newContent); }} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { setTerms(newContent) }}
          />
          {/* <Textarea
            id="terms"
            rows={8}
            placeholder="Write Terms and Conditions here"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          /> */}
        </FormGroup>
        {!readOnlyPermissions && (
          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving…"
              : recordId
                ? "Update changes"
                : "Create Static Page"}
          </Button>
        )}


      </form>
    </Container>
  );
};

export default Staticpage;
