import React from 'react';
import { ZoomMtg } from '@zoom/meetingsdk';
// import './ZoomMeeting.css';
import { generateAccessToken, generateSignature } from '../../../../api/meetingApi';
import { useLocation } from 'react-router-dom';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const AdminZoomMeeting = () => {
    // const authEndpoint = 'http://localhost:4000';
    const sdkKey = import.meta.env.VITE_APP_ZOOM_MEETING_SDK_KEY;
    const registrantToken = '';
    let zakToken = '';
    //   const leaveUrl = 'http://localhost:5173';
    const location = useLocation()
    const { meetingNumber, passWord, role, userName, userEmail, leaveUrl, meetingTitle } = location.state;
    // console.log("meeting details", location.state);
    const getSignature = async () => {
        try {
            //   const req = await fetch(authEndpoint, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ meetingNumber, role }),
            //   });
            //   const res = await req.json();
            if (role == 1) {
                const zak = await generateAccessToken();
                zakToken = zak.accessToken;
                console.log("zak", zak);
            }
            const response = await generateSignature({ meetingNumber, role });
            // console.log("signature", response); // console.log('Generated Signature:', res,"\n", response,"\n",res==response,"\n role", role);
            startMeeting(response.signature);
        } catch (e) {
            console.error('Error fetching signature:', e);
        }
    };

    const startMeeting = (signature) => {
        document.getElementById('zmmtg-root').style.display = 'block';

        ZoomMtg.init({
            leaveUrl,
            patchJsMedia: true,
            isSupportAV: true,
            success: () => {
                ZoomMtg.join({
                    signature,
                    sdkKey,
                    meetingNumber,
                    passWord,
                    userName,
                    userEmail,
                    // tk: zakToken,
                    // zak: role == 1 ? zakToken : "",
                    success: (res) => console.log('Meeting joined', res),
                    error: (err) => console.error('Join Error', err),
                });
            },
            error: (err) => console.error('Init Error', err),
        });
    };

    return (
        <div className="zoom-meeting-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',       // Full viewport height
            width: '100%',           // Full width
            textAlign: 'center'      // Center text for child elements
        }}>
            <div className="zoom-meeting-content" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',           // Space between elements
                maxWidth: '600px',     // Optional: limit width
                padding: '20px',
                margin: '0 auto'       // Horizontal centering
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '2rem',
                    color: '#333'        // Adjust color as needed
                }}>{meetingTitle}</h1>

                <button
                    onClick={getSignature}
                    style={{
                        backgroundColor: '#2D8CFF',
                        color: '#ffffff',
                        padding: '12px 40px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'background-color 0.3s',
                        ':hover': {
                            backgroundColor: '#1a7ae8'
                        }
                    }}
                >
                    Host Meeting
                </button>
            </div>
        </div>
    );
};

export default AdminZoomMeeting;
