import react from "react";
import Footer from "../../pages/LandingPage/Footer/Footer";
import Entrance from "../../module/admin/pages/WebManagement/Entrance/Entrance";
import Header from "../../pages/LandingPage/LandingHeader/LandingHeader";
import Entrances from "../Entrances/Entrances";

const OverallEntrance = () => {
    return <>
    <Header />
   <Entrances />
   
    <Footer />
    </>;
};

export default OverallEntrance;