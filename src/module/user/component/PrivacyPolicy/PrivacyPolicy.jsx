// import React from 'react';
// import { PrivacyContainer, PrivacyHeading, PrivacyPara } from './PrivacyPolicy.styles';
// import { getAllStatic } from '../../../../api/staticApi';
// const policyParagraphs = [
//   "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae ad nisi numquam illum repellat quas veritatis, similique at, beatae quisquam cupiditate. Vel error voluptatem quam ad aliquid eaque, optio alias neque eum dolores, similique rem deserunt reiciendis eos tempora quasi illum libero cumque, ipsa ut. Cupiditate velit ea sunt neque sint, rem rerum molestias modi. Sequi possimus cum perspiciatis sit fugiat aut facilis optio officiis consequuntur commodi reiciendis sint, odio quae saepe ullam obcaecati velit voluptate laboriosam iusto debitis nam fuga non ea? Repellendus maiores vitae dolorum in cupiditate earum repudiandae est enim, corrupti delectus.",
// ];

// const PrivacyPolicy = () => (
//   <PrivacyContainer>
//     <PrivacyHeading>Privacy Policy</PrivacyHeading>
//     {policyParagraphs.map((para, index) => (
//       <PrivacyPara key={index}>{para}</PrivacyPara>
//     ))}
//   </PrivacyContainer>
// );

// export default PrivacyPolicy;

import React, { useState, useEffect } from 'react';
import { PrivacyContainer,PrivacyHeading, PrivacyPara } from './PrivacyPolicy.styles';
import { getAllStatic } from '../../../../api/staticApi';

const PrivacyPolicy = () => {
  const [termsContent, setTermsContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getAllStatic();
        // Access the first item in the array and get its terms property
        if (Array.isArray(response) && response.length > 0) {
          setTermsContent(response[0].privacy);
        } else {
          setError("No terms content found");
        }
      } catch (err) {
        console.error("Failed to fetch terms:", err);
        setError("Failed to load terms and conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return <PrivacyContainer>Loading terms and conditions...</PrivacyContainer>;
  }

  if (error) {
    return <PrivacyContainer>{error}</PrivacyContainer>;
  }

  return (
    <PrivacyContainer>
      {/* <PrivacyHeading>Privacy Policy</PrivacyHeading>
      {/* <Termspara>
        By accessing and using the services provided by Mankavit Law Academy, you agree to the following Terms and Conditions:
      </Termspara> */}
      {/* <PrivacyPara>{termsContent}</PrivacyPara>  */}
      <PrivacyPara dangerouslySetInnerHTML={{ __html: termsContent }} />
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;