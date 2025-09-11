import React from "react";
import {
  KYCContainer,
  KYCMessage,
  KYCSubtext,
  UpdateButton,
} from "./KYCRejected.styles";
import { useNavigate } from "react-router-dom";
import { getCookiesData } from "../../../../utils/cookiesService";

export default function KYCRejected() {
    const navigate = useNavigate();
  return (
    <KYCContainer>
      <KYCMessage>Your KYC is Rejected</KYCMessage>
      <KYCSubtext>
        Please update your KYC to continue learning and access all features.
      </KYCSubtext>
      <UpdateButton onClick={async() => {
        const cookiesData =await getCookiesData();
         navigate(`/user/profile/${cookiesData.userId}`);
      }}>Update KYC</UpdateButton>
    </KYCContainer>
  );
}
