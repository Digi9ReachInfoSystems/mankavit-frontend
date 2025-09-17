import React, { useState } from 'react';

const AccountDeletionPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // In a real application, you would send the data to your server here
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Request Account Deletion</h1>
        <p style={styles.subtitle}>
          Please fill out the form below to request deletion of your account. 
          All requests will be processed within 7 business days.
        </p>
        
        {isSubmitted ? (
          <div style={styles.successMessage}>
            <h2 style={styles.successTitle}>Account Deletion Request Sent</h2>
            <p style={styles.successText}>
              Thank you for your request. We will process your account deletion within 7 business days. 
              You will receive a confirmation email once the process is complete.
            </p>
            <div style={styles.successIcon}>&#10003;</div>
            <button 
              onClick={resetForm}
              style={styles.resetButton}
            >
                Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.name && styles.inputError)
                }}
                placeholder="Enter your full name"
              />
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.email && styles.inputError)
                }}
                placeholder="Enter your email address"
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.phone && styles.inputError)
                }}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
            </div>
            
            <button type="submit" style={styles.submitButton}>
              Submit Deletion Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '28px'
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#444'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none',
    '&:focus': {
      borderColor: '#3498db',
      boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)'
    }
  },
  inputError: {
    borderColor: '#e74c3c',
    boxShadow: '0 0 0 2px rgba(231, 76, 60, 0.2)'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block'
  },
  submitButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  },
  successMessage: {
    textAlign: 'center',
    padding: '20px'
  },
  successTitle: {
    color: '#27ae60',
    marginBottom: '15px',
    fontSize: '24px'
  },
  successText: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  successIcon: {
    fontSize: '60px',
    color: '#27ae60',
    fontWeight: 'bold',
    margin: '20px 0'
  },
  resetButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#2980b9'
    }
  }
};

export default AccountDeletionPage;