import React, { use, useEffect, useState } from 'react'
import {
    Wrapper,
    SectionTitle,
    CertificatesWrapper,
    CertificateDownload,
    CertificateCard,
    CertificateImage,
} from './Certificates.styles';
import certificate from "../../../../assets/certificate.png";
import { FiDownload } from "react-icons/fi";
import { getCookiesData } from '../../../../utils/cookiesService';
import { getAllCertificates } from '../../../../api/certificateApi';


// const certificates = [
//     { id: 1, imgUrl: certificate, title: 'CLAT Coaching (22 Nov 2024 - 23 Jan 2025)' },
//     { id: 2, imgUrl: certificate, title: 'CLAT Coaching (1 Feb 2025 - 31 May 2025)' },
//     { id: 3, imgUrl: certificate, title: 'CLAT Coaching (22 Nov 2024 - 23 Jan 2025)' },
//     { id: 4, imgUrl: certificate, title: 'CLAT Coaching(1 Feb 2025 - 31 May 2025)' },
//     { id: 5, imgUrl: certificate, title: 'CLAT Coaching (22 Nov 2024 - 23 Jan 2025)' },
//     { id: 6, imgUrl: certificate, title: 'CLAT Coaching (1 Feb 2025 - 31 May 2025)' },
// ];
const Certificates = () => {

    const [certificates, setCertificates] = useState([]);
    useEffect(() => {
        // // console.log("Certificates component mounted");
        const fetchCertificates = async () => {
            const cookieData = await getCookiesData();
            const certificatesData = await getAllCertificates(cookieData.userId);
            // // console.log("Certificates Data", certificatesData);
            const preparedData = certificatesData.data.map((cert) => {
                return {
                    id: cert._id,
                    imgUrl: cert.certificate_url,
                    title: cert.course_ref.courseName
                };
            });
            // console.log("Prepared Certificates Data", preparedData);
            setCertificates(preparedData);

        };

        fetchCertificates();
    }, []);

    return (

        <Wrapper>
            <SectionTitle>My Certificates</SectionTitle>
            {certificates.length === 0 ? <p>No certificates available</p> :
                <CertificatesWrapper>
                    {certificates.map((certificate) => (

                        <CertificateCard key={certificate.id}>
                            <CertificateDownload
                            onClick={() => {
                            if (certificate.imgUrl) {
                                // Open in new tab
                                window.open(certificate.imgUrl, "_blank");
                            }
                        }}
                            >
                                {certificate.title} <FiDownload fontSize={20} />
                            </CertificateDownload>

                            {/* <CertificateImage src={certificate.imgUrl} alt="Certificate" /> */}
                            <iframe
                            src={`${import.meta.env.VITE_APP_IMAGE_ACCESS}/api/project/resource?fileKey=${certificate.imgUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                            width="600"
                            height="415px"
                            style={{
                                border: "none",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                borderRadius: "10px"
                            }}
                            title="Certificate Preview"
                        />
                        </CertificateCard>
                    ))}
                </CertificatesWrapper>}
        </Wrapper>


    )
}

export default Certificates
