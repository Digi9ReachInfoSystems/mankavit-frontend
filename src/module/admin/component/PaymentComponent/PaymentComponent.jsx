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

const PaymentComponent = ({ userId, amount, courseRef, discountActive, actualPrice, discountPrice }) => {
  console.log("userId", userId, "amount", amount, "courseRef", courseRef);
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
        callback_url: '' // Optional
      });
      const userData = await getUserByUserId(userId);
      console.log("userData", userData);
      const order = orderResponse.data;
      console.log("order", order);


      const options = {
        key: razorPayKeys.key_id, // Your Razorpay Key ID
        amount: Number(amount * 100), // Amount in paise
        currency: "INR",
        name: razorPayKeys.name,
        // description: order.notes.description,
        image: razorPayKeys.logo, // Optional: Logo image
        order_id: order.orderId,
        handler: async function (response) {
          // console.log(response);
          //  for testing webhook localhost
          // try {
          //   // Step 3: Verify Payment on Backend
          //   const verificationResponse = await axiosInstance.post('/api/payments/verify-payment-webhook', {
          //     razorpay_order_id: response.razorpay_order_id,
          //     razorpay_payment_id: response.razorpay_payment_id,
          //     razorpay_signature: response.razorpay_signature,
          //     event :"payment.captured",
          //     order_id: order.id,
          //     payload:{
          //       payment:
          //       {
          //         entity:
          //         {
          //           order_id:order.id,
          //           id:response.razorpay_payment_id
          //         }
          //       }
          //     }

          //     // razorpay_signature: generated_signature,
          //   });
          //   console.log("verificationResponse", verificationResponse);

          //   if (verificationResponse.data.status === 'ok') {
          //     alert('Payment Successful!');
          //     // Optionally, redirect or update UI
          //     navigate('/student/package/paymentSuccess');
          //   } else {
          //     alert('Payment Verification Failed!');
          //   }
          // } catch (error) {
          //   console.error('Payment Verification Error:', error);
          //   alert('Payment Verification Failed!');
          // }

          // ////console.log(response);
          // calling webhook online
          try {
            // const verificationResponse = await axiosInstance.post('/api/payments/verify-payment', {
            //   razorpay_order_id: response.razorpay_order_id,
            //   razorpay_payment_id: response.razorpay_payment_id,
            //   razorpay_signature: response.razorpay_signature,
            // });

            // if (verificationResponse.data.message === 'Payment verified successfully') {
            alert('Payment Successful!');
            // Optionally, redirect or update UI
            const cookieData = await getCookiesData();
            const user = await getUserByUserId(cookieData.userId);
            if (user.user.kyc_status == "not-applied") {
              navigate('/user/kyc');
            } else {
              navigate('/user');
            }
            // } else {
            //   alert('Payment Verification Failed!');
            // }
          } catch (error) {
            //console.error('Payment Verification Error:', error);
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
      // console.log("options", options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      //console.error('Error initiating payment:', error);
      alert(`Could not initiate payment. Please try again. ${error}`);
      console.log("error", error);
    } finally {
      setIsPaying(false);
    }
  };


  return (
    <EnrollButton onClick={handlePayment}>
      {isPaying ? 'Processing Payment...' : `Enroll Now ₹${discountActive ? discountPrice : actualPrice}/-`}
    </EnrollButton>

  )
};

export default PaymentComponent;
