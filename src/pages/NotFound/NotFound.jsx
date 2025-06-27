import React from 'react'
import Lottie from "lottie-react";
import notfoundAnimation from "../../assets/Lottie/notound.json";

export default function NotFound() {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Lottie
            className="Lottie"
            animationData={notfoundAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
        />
    </div>;
}
