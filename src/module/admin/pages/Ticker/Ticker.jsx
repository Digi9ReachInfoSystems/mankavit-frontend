// src/modules/admin/components/AboutUs/AboutUs.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Container,
  Title,
  FormGroup,
  Label,
  Input,
  Button,
} from "./Ticker.style";
import {
  createTicker,
  updateTicker,
  getAllTickers,
} from "../../../../api/tickerApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "../../../../utils/authService";
import JoditEditor from 'jodit-react';

export default function Ticker() {
  const [formData, setFormData] = useState({ id: "", title: "" });
  const [saving, setSaving] = useState(false);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(response.Permissions["webManagement"].readOnly);
      }
    }
    apiCaller();
  }, []);
  const editor = useRef(null);
  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: formData.title || 'Start typings...',
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

  // Load existing ticker (if any)
  useEffect(() => {
    async function load() {
      try {
        const list = await getAllTickers();
        if (Array.isArray(list) && list.length > 0) {
          // Only manage the first ticker
          const [{ _id, title }] = list;
          setFormData({ id: _id, title });
        }
      } catch (err) {
        console.error("Failed to load ticker", err);
        toast.error("Could not load existing ticker");
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    // only letters and spaces allowed
    // const title = e.replace(/[^a-zA-Z\s]/g, "");
    const title = e;
    setFormData({ ...formData, title });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a title.");
      return;
    }
    setSaving(true);
    try {
      if (formData.id) {
        await updateTicker(formData.id, { title: formData.title });
        toast.success("Ticker updated successfully!");
      } else {
        const newItem = await createTicker({ title: formData.title });
        setFormData({ id: newItem._id, title: newItem.title });
        toast.success("Ticker created successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
      />

      <Title>Ticker Management</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title *</Label>
          <JoditEditor
            ref={editor}
            value={formData.title}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => { console.log("new", newContent); }} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { handleChange(newContent) }}
          />
          {/* <Input
            id="title"
            name="title"
            placeholder="Enter ticker title"
            value={formData.title}
            onChange={handleChange}
            required
          /> */}
        </FormGroup>
        {
          !readOnlyPermissions &&
          <Button type="submit" disabled={saving}>
            {saving
              ? "Processing..."
              : formData.id
                ? "Update Ticker"
                : "Create Ticker"}
          </Button>
        }

      </form>
    </Container>
  );
}
