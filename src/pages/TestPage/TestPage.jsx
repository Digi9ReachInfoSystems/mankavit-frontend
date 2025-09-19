
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Payment.css'; // Optional styling

const TestPage = () => {
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch user details (you can modify this as needed)
  useEffect(() => {
   
     
  }, []);

  const createOrder = async () => {
    setLoading(true);
    try {
      // const response = await axios.post('http://localhost:3000/payment/createOrder', {
      //   user_ref:"s5ZdLnYhnVfAramtr7knGduOI872", // Replace with actual user reference
      //   amount: amount,
      //   description: 'Payment for services',
      //   order_id: '6813574f9c3adbfb761b80c8' // Replace with your order ID if needed
      // });
      // // console.log('Order created:', response.data); 

      // setOrderId(response.data.id);
      // return response.data;
    } catch (error) {
      // console.error('Error creating order:', error);
      setPaymentStatus('Failed to create order');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    if (!amount || amount <= 0) {
      setPaymentStatus('Please enter a valid amount');
      return;
    }

    const order = await createOrder();
    // if (!order) return;

    const options = {
      key: "rzp_test_JukdKxCGZqamy4", // From your environment variables
      amount: 1496 * 100,
      currency:  "INR",
      name: "Your Company Name",
      description: "Payment for services",
      order_id: "order_QVHD8PCrDIgM0j",
      handler: async function (response) {
        // console.log("response", response);
        // try {
        //   const verificationResponse = await axios.post('/api/payment/verify', {
        //     razorpay_order_id: response.razorpay_order_id,
        //     razorpay_payment_id: response.razorpay_payment_id,
        //     razorpay_signature: response.razorpay_signature
        //   });

        //   setPaymentStatus('Payment successful!');
        //   // console.log('Payment verification:', verificationResponse.data);
        // } catch (error) {
        //   // console.error('Payment verification failed:', error);
        //   setPaymentStatus('Payment verification failed');
        // }
      },
      prefill: {
        name: "sample",
        email:"sample@gmail.com",
        contact: "1234567890"
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: function() {
          setPaymentStatus('Payment cancelled');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>
      
      <div className="form-group">
        <label htmlFor="amount">Amount (INR):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="1"
          required
        />
      </div>

      <div className="user-details">
        <h3>Your Details</h3>
        <p>Name: {userDetails.name || 'Not provided'}</p>
        <p>Email: {userDetails.email || 'Not provided'}</p>
        <p>Phone: {userDetails.phone || 'Not provided'}</p>
      </div>

      <button 
        onClick={initiatePayment} 
        disabled={loading || !amount}
        className="pay-button"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>

      {paymentStatus && (
        <div className={`payment-status ${paymentStatus.includes('success') ? 'success' : 'error'}`}>
          {paymentStatus}
        </div>
      )}

      <div className="payment-info">
        <p>Secure payments powered by Razorpay</p>
        <img 
          src="https://razorpay.com/assets/razorpay-glyph.svg" 
          alt="Razorpay" 
          className="razorpay-logo"
        />
      </div>
    </div>
  );
};

export default TestPage;