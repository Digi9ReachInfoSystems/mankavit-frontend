import React, { useState, useEffect } from "react";
import {
  DashboardWrapper,
  DashboardContent,
  Application,
  Courses,
  MasterOtpSection,
  OtpInput,
  UpdateButton
} from "./Dashboard.style";
import Stats from "../../component/Stats/Stats";
import ApplicationsGraph from "../../component/ApplicationGraph/ApplicationGraph";
import ApplicationByCourses from "../../component/ApplicationByCourses/ApplicationByCourses";
import CourseList from "../../component/CourseList/CoursesList";
import { getMasterOtp, updateMasterOtp } from "../../../../api/masterOtpApi";
import toast, { Toaster } from "react-hot-toast";
import { getAuth } from "../../../../utils/authService";

const Dashboard = () => {
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [readOnlyPermissions, setReadOnlyPermissions] = useState(false);
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getMasterOtp();
      setOtp(response.otp);
    };
    apiCaller();
  }, [])
  useEffect(() => {
    const apiCaller = async () => {
      const response = await getAuth();
      response.Permissions;
      if (response.isSuperAdmin === true) {
        setReadOnlyPermissions(false);
      } else {
        setReadOnlyPermissions(true);
      }
    }
    apiCaller();
  }, []);



  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setIsOtpValid(true);

    }

  };

  const handleUpdateOtp = () => {
    if (otp.length === 6) {
      const updateResponse = updateMasterOtp({ otp });
      // console.log("Updating OTP to:", otp);
      toast.success("OTP updated successfully!");
      // alert(`OTP updated successfully: ${otp}`);
    } else {
      setIsOtpValid(false);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardContent>
        <Stats />
        <Toaster />
        {/* Master OTP Section */}
        {
          !readOnlyPermissions &&
          <MasterOtpSection>
            <h3>Master OTP</h3>
            <div>
              <OtpInput
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                isValid={isOtpValid}
              />
              <UpdateButton onClick={handleUpdateOtp}>Update</UpdateButton>
            </div>
            {!isOtpValid && <p className="error">Please enter a valid 6-digit OTP</p>}
          </MasterOtpSection>
        }


      </DashboardContent>
      {/* <Application> 
        <ApplicationsGraph />
        <ApplicationByCourses />
      </Application>
      <Courses>
        <CourseList />
      </Courses> */}
    </DashboardWrapper>
  );
};

export default Dashboard;