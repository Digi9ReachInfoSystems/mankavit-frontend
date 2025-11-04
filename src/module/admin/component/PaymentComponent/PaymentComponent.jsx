// src/components/PaymentComponent.jsx

import React from 'react';
import axiosInstance from '../../../../config/axiosConfig'; // Adjust the path as needed
import { EnrollButton } from "./PaymentComponent.styles";
// import { getStudentById } from '../../../../api/studentApi';
import { useNavigate } from 'react-router-dom';
import { razorPayKeys } from '../../../../config/razorpayConfig';
import CryptoJS from 'crypto-js';
import { getUserByUserId } from '../../../../api/authApi';
import { getCookiesData } from '../../../../utils/cookiesService';

const PaymentComponent = ({ userId, amount, courseRef, discountActive, actualPrice, discountPrice, couponApplied, couponCode, couonDiscount }) => {
  // // console.log("userId", userId, "amount", amount, "courseRef", courseRef);
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = React.useState(false);
  const handlePayment = async () => {
    setIsPaying(true);
    try {
      // Step 1: Create Order on Backend
      const orderResponse = await axiosInstance.post('/api/v1/payment/createpayment', {
        userRef: userId,
        courseRef: courseRef,
        amountPaid: amount,
        paymentType: 'WEB',
        callback_url: '',// Optional
        couponApplied: couponApplied,
        couponRef: couponCode,
        couponDiscount: couonDiscount
      });
      const userData = await getUserByUserId(userId);
      // // console.log("userData", userData);
      const order = orderResponse.data;
      // // console.log("order", order);


      const options = {
        key: razorPayKeys.key_id, // Your Razorpay Key ID
        amount: Number(amount * 100), // Amount in paise
        currency: "INR",
        name: razorPayKeys.name,
        // description: order.notes.description,
        image: razorPayKeys.logo, // Optional: Logo image
        order_id: order.orderId,
        handler: async function (response) {
          
          try {
             alert('Payment Successful!');
            // Optionally, redirect or update UI
            const cookieData = await getCookiesData();
            // // console.log("cookieData", cookieData);
            const user = await getUserByUserId(cookieData.userId);
            // // console.log("user", user);
            if (user.user.kyc_status == "not-applied") {
              navigate('/kyc');
            } else {
              navigate('/user');
            }
            // } else {
            //   alert('Payment Verification Failed!');
            // }
          } catch (error) {
            //// // console.error('Payment Verification Error:', error);
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: userData.user.displayName, // Replace with actual student name
          email: userData.user.email, // Replace with actual student email
          contact: userData.user.phone, // Replace with actual contact number
        },
        // notes: {
        //   address: 'Student Address', // Optional
        // },
        theme: {
          color: '#3399cc', // Customize the color as needed
        },
      };
      // // // console.log("options", options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      //// // console.error('Error initiating payment:', error);
      alert(`Could not initiate payment. Please try again. ${error}`);
      // console.log("error", error);
    } finally {
      setIsPaying(false);
    }
  };


  return (
    <EnrollButton onClick={handlePayment}>
      {/* {isPaying ? 'Processing Payment...' : `Enroll Now ₹${discountActive ? discountPrice : actualPrice}/-`} */}
      {isPaying ? 'Processing Payment...' : `Enroll Now ₹${amount}/-`}
    </EnrollButton>

  )
};

export default PaymentComponent;
