import React from 'react'
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


const certificates = [
    { id: 1, imgUrl: certificate, title: 'CLAT Coaching (22 Nov 2024 - 23 Jan 2025)' },
    { id: 2, imgUrl: certificate, title: 'CLAT Coaching (1 Feb 2025 - 31 May 2025)' },
    { id: 3, imgUrl: certificate, title: 'CLAT Coaching (22 Nov 2024 - 23 Jan 2025)' },
    { id: 4, imgUrl: certificate, title: 'CLAT Coaching(1 Feb 2025 - 31 May 2025)' },
    { id: 5, imgUrl: certificate, title: 'CLAT Coaching (22 Nov 2024 - 23 Jan 2025)' },
    { id: 6, imgUrl: certificate, title: 'CLAT Coaching (1 Feb 2025 - 31 May 2025)' },
];
const Certificates = () => {
    return (

            <Wrapper>
                <SectionTitle>My Certificates</SectionTitle>

                <CertificatesWrapper>
                    {certificates.map((certificate) => (

                        <CertificateCard key={certificate.id}>
                            <CertificateDownload >
                                {certificate.title} <FiDownload fontSize={20} />
                            </CertificateDownload>

                            <CertificateImage src={certificate.imgUrl} alt="Certificate" />
                        </CertificateCard>
                    ))}
                </CertificatesWrapper>
            </Wrapper>


    )
}

export default Certificates
