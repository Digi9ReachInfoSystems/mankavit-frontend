import React, { useState } from 'react';
import { Container, 
    ContainerHeading, 
    TabBar, 
    TabButton 
} from './TandC.styles';
import TermsAndCondition from '../../component/TermsAndCondition/TermsAndCondition';
import PrivacyPolicy from '../../component/PrivacyPolicy/PrivacyPolicy';

const TandC = () => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <Container>
      <ContainerHeading>T&C</ContainerHeading>
      <TabBar>
        <TabButton active={activeTab === 'terms'} onClick={() => setActiveTab('terms')}>
          Terms & Condition
        </TabButton>
        <TabButton active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')}>
          Privacy Policy
        </TabButton>
      </TabBar>
      {activeTab === 'terms' ? <TermsAndCondition /> : <PrivacyPolicy />}
    </Container>
  );
};

export default TandC;
