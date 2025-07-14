import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // If using React Router
import { Button } from '@mui/material'; // Or any other UI library

const ZoomIframeMeetingUser = () => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const meetingData = loaction.state || {}; // Use loaction.state.meetingData if using React Router

  // Function to handle going back
  const handleGoBack = () => {
    // If using React Router
    navigate(-1); // Goes back to previous page in history
    // OR navigate('/home'); // To specific route

    // If not using React Router:
    // window.history.back();
    // OR window.location.href = '/home';
  };
  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log('Permissions granted');
    } catch (err) {
      console.error('Permission denied:', err);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px' }}>
      <div
        style={
          {
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'right',
           gap: '20px'

          }
        }>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          style={{
            // position: 'absolute',
            // top: '10px',
            // left: '30px',
            // zIndex: 1000,

            backgroundColor: '#2d8cff', // Zoom blue color
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '8px 16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          ← Back to Home
        </Button>
        {/* Overlay button positioned absolutely */}

        <Button
          style={{
            // position: 'absolute',
            // top: '10px',
            // left: '30px',
            // zIndex: 1000,
            backgroundColor: '#2d8cff', // Zoom blue color
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '8px 16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          onClick={requestPermissions}>Enable Camera/Mic</Button>

      </div>

      <iframe
        src={`https://zoom.us/wc/join/${meetingData.meetingNumber}?pwd=${meetingData.passWord}`}
        style={{ width: '100%', height: '90%', border: 'none' }}
        allow="microphone; camera; fullscreen"
        title="Zoom Meeting"

        allowFullScreen


        permissions="camera, microphone"
      />
       {/* <iframe
        src={`https://zoom.us/s/${meetingData.meetingNumber}?pwd=${meetingData.password}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="camera; microphone; fullscreen"
        allowFullScreen
        title="Zoom Host Meeting"
      /> */}




    </div>
  );
};

export default ZoomIframeMeetingUser;