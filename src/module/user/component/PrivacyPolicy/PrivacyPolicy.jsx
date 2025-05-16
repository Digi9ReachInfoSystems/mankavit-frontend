import React from 'react';
import { PrivacyContainer, PrivacyHeading, PrivacyPara } from './PrivacyPolicy.styles';

const policyParagraphs = [
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae ad nisi numquam illum repellat quas veritatis, similique at, beatae quisquam cupiditate. Vel error voluptatem quam ad aliquid eaque, optio alias neque eum dolores, similique rem deserunt reiciendis eos tempora quasi illum libero cumque, ipsa ut. Cupiditate velit ea sunt neque sint, rem rerum molestias modi. Sequi possimus cum perspiciatis sit fugiat aut facilis optio officiis consequuntur commodi reiciendis sint, odio quae saepe ullam obcaecati velit voluptate laboriosam iusto debitis nam fuga non ea? Repellendus maiores vitae dolorum in cupiditate earum repudiandae est enim, corrupti delectus.",
];

const PrivacyPolicy = () => (
  <PrivacyContainer>
    <PrivacyHeading>Privacy Policy</PrivacyHeading>
    {policyParagraphs.map((para, index) => (
      <PrivacyPara key={index}>{para}</PrivacyPara>
    ))}
  </PrivacyContainer>
);

export default PrivacyPolicy;
