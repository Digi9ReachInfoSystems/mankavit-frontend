// import React, { useState } from "react";
// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
// import { KJUR } from "jsrsasign";
// import { generateSignature } from "../../api/meetingApi";
// import { ZoomMtg } from "@zoom/meetingsdk";
// // ZoomMtg.preLoadWasm();
// // ZoomMtg.prepareWebSDK();
// ZoomMtg.setZoomJSLib("https://source.zoom.us/2.15.0/lib", "/av");
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// const Test = () => {
//     const sdkKey = "ic2SnUQYQZmWvLbUk99gEQ";
//     const sdkSecret = "oIt2I32lPY28zGQhjFeE7LHMiMH2eIas";
//     const meetingNumber = "87211631529";
//     const passWord = "123456";
//     const userName = "Your Name";
//     const userEmail = "your@email.com";
//     const leaveUrl = "https://zoom.us";

//     const [joined, setJoined] = useState(false);

//     const createSignatureLocally = () => {
//         // const data= await generateSignature({ meetingNumber, role: 0 });
//         // console.log("data", data);
//         const iat = Math.floor(Date.now() / 1000) - 30;
//         const exp = iat + 60 * 60 * 2;

//         const oHeader = { alg: "HS256", typ: "JWT" };
//         const oPayload = {
//             sdkKey,
//             mn: meetingNumber,
//             role: 0,
//             iat,
//             exp,
//             tokenExp: exp,
//         };

//         const sHeader = JSON.stringify(oHeader);
//         const sPayload = JSON.stringify(oPayload);

//         const signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
//         console.log("signature", signature);
//         // return signature;
//         return 'eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMiIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI4NzIxMTYzMTUyOSIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoic3FuUW9jRWxSNnFIb25aX1J0OTBNZyIsInppZCI6IjMwZWRjNzhhZjVjYzQ3MWM5MmFjY2MyYjFjMTdlNDYxIiwic2siOiI0MDk1MjI4Mzc0NDU0ODE2NDc3Iiwic3R5IjoxMDAsIndjZCI6InVzMDIiLCJleHAiOjE3NDc5MTg1OTcsImlhdCI6MTc0NzkxMTM5NywiYWlkIjoiU0lGWXBLSUJSeldRdmItS1BTSWxWdyIsImNpZCI6IiJ9.0b2CdOBVlg-8tnZKVbkVSAiZIyq0XBE3nYGAO0f9OKI'
//     };

//     const joinMeeting = async () => {
//         const client = ZoomMtgEmbedded.createClient();
//         const meetingSDKElement = document.getElementById("meetingSDKElement");
//         let signature;
//         client.init({
//             zoomAppRoot: meetingSDKElement,
//             language: "en-US",
//             customize: {
//                 video: { isResizable: true },
//                 meetingInfo: ["topic", "host", "mn", "pwd", "invite", "participant", "dc"],
//             },
//         });
//         try {
//             const data= await generateSignature({ meetingNumber, role: 0 });
//             console.log("data", data);
//         } catch (error) {
//             console.error("Error initializing Zoom Meeting SDK:", error);
//         }

//         try {
//             const signature = createSignatureLocally();
//             console.log("Generated Signature:", signature, "payload",
//                 {
//                     sdkKey,
//                     signature,
//                     meetingNumber,
//                     password: passWord,
//                     userName,
//                     userEmail,
//                 }
//             );

//             const data = await client.join({
//                 sdkKey,
//                 signature,
//                 meetingNumber,
//                 password: passWord,
//                 userName,
//                 userEmail,
//             });

//             console.log("Join Meeting Response:", data);

//             setJoined(true);
//         } catch (error) {
//             console.error("Error joining Zoom meeting:", error);
//         }
//     };

//     return (
//         <div style={{ height: "100vh", padding: "20px" }}>
//             <h1 style={{ textAlign: "center" }}>Zoom Meeting Join Page</h1>
//             {!joined && (
//                 <div style={{ textAlign: "center", marginTop: "20px" }}>
//                     <button onClick={joinMeeting} style={{ padding: "10px 20px", fontSize: "16px" }}>
//                         Join Meeting
//                     </button>
//                 </div>
//             )}
//             <div
//                 id="meetingSDKElement"
//                 style={{
//                     width: "100%",
//                     height: "80vh",
//                     marginTop: "20px",
//                     display: joined ? "block" : "none",
//                 }}
//             />
//         </div>
//     );
// };

// export default Test;
import React from "react";

const Test = () => {
    return <div>Test</div>;
};

export default Test;
