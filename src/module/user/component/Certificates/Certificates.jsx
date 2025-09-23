import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  SectionTitle,
  CertificatesWrapper,
  CertificateDownload,
  CertificateCard,
  ViewMoreButton,
  CertificateTitle
} from './Certificates.styles';
import { FiDownload } from "react-icons/fi";
import { getCookiesData } from '../../../../utils/cookiesService';
import { getAllCertificates } from '../../../../api/certificateApi';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      const cookieData = await getCookiesData();
      const certificatesData = await getAllCertificates(cookieData.userId);

      const preparedData = certificatesData.data.map((cert) => ({
        id: cert._id,
        imgUrl: cert.certificate_url,
        title: cert.course_ref.courseName,
      }));

      setCertificates(preparedData);
    };

    fetchCertificates();
  }, []);

  // Show only first 4 certificates unless View More clicked
  const displayedCertificates = showAll ? certificates : certificates.slice(0, 4);

  return (
    <Wrapper>
      <SectionTitle>My Certificates</SectionTitle>

      {certificates.length === 0 ? (
        <p>No certificates available</p>
      ) : (
        <>
          <CertificatesWrapper>
            {displayedCertificates.map((certificate) => (
              <CertificateCard key={certificate.id}>
                <CertificateDownload
                  onClick={() => window.open(certificate.imgUrl, "_blank")}
                >
                   <CertificateTitle>{certificate.title}</CertificateTitle><FiDownload fontSize={18} />
                </CertificateDownload>

                <iframe
                  src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${certificate.imgUrl}#toolbar=0&view=FitH&navpanes=0&scrollbar=0&zoom=page-width`}
                  style={{
                    width: "100%",
                    height: "270px",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  title="Certificate Preview"
                />
              </CertificateCard>
            ))}
          </CertificatesWrapper>

          {/* Show button only if > 4 certificates */}
          {certificates.length > 4 && (
            <ViewMoreButton onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View More"}
            </ViewMoreButton>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Certificates;
