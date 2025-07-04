// src/components/AboutContainer/AboutContainer.jsx
import React, { useState, useEffect } from 'react';
import {
  AboutmainContainer,
  AboutTitle,
  AboutContent,
  ContentOne,
  ContentTwo
} from './AboutContainer.styles';
import { getAllAboutUs } from '../../../api/aboutUsApi';

const AboutContainer = () => {
  const [aboutItems, setAboutItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllAboutUs();
        // Expecting an array like [{ _id, title, description, … }, …]
        setAboutItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Could not load About Us content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <AboutmainContainer>
      <AboutTitle>About Us</AboutTitle>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <AboutContent>
          {aboutItems.map((item, idx) => {
            // alternate components for styling
            const Component = idx % 2 === 0 ? ContentOne : ContentTwo;
            return (
              <Component key={item._id}>
                {/* if you have a title field and want to render it: */}
                {item.title && <strong>{item.title}</strong>}
                {/* <p>{item.description}</p> */}
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </Component>
            );
          })}
        </AboutContent>
      )}
    </AboutmainContainer>
  );
};

export default AboutContainer;
