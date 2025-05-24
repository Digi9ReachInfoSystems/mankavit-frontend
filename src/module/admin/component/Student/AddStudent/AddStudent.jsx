import React, { useState } from 'react';
import {
  FormContainer,
  Title,
  InputGroup,
  InputField,
  Label,
  SubmitButton,
  FlexRow
} from './AddStudent.styles';
import { createStudent } from '../../../../../api/userApi';

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!studentData.name) errors.name = 'Name is required';
    if (!studentData.email) errors.email = 'Email is required';
    if (!studentData.phone) errors.phone = 'Phone is required';
    if (!studentData.password) errors.password = 'Password is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const response = await createStudent(studentData);
      alert('Student added successfully!');
      console.log('Response:', response);

      // Reset form
      setStudentData({
        name: '',
        email: '',
        phone: '',
        password: ''
      });
      setFormErrors({});
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Add Student</Title>

      <InputGroup>
        <Label>Full Name</Label>
        <InputField
          placeholder="Enter Full Name"
          name="name"
          value={studentData.name}
          onChange={handleChange}
        />
        {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
      </InputGroup>

      <FlexRow>
        <InputGroup>
          <Label>Email</Label>
          <InputField
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={studentData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </InputGroup>
        <InputGroup>
          <Label>Mobile Number</Label>
          <InputField
            type="tel"
            placeholder="Enter Mobile Number"
            name="phone"
            value={studentData.phone}
            onChange={handleChange}
            maxLength={10}
          />
          {formErrors.phone && <p style={{ color: 'red' }}>{formErrors.phone}</p>}
        </InputGroup>
      </FlexRow>

      <InputGroup>
        <Label>Password</Label>
        <InputField
          type="password"
          placeholder="Enter Password"
          name="password"
          value={studentData.password}
          onChange={handleChange}
        />
        {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
      </InputGroup>

      <SubmitButton type="submit">Add Student</SubmitButton>
    </FormContainer>
  );
};

export default AddStudent;
