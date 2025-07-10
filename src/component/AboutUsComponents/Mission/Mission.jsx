// components/Mission.jsx
import React, { useEffect, useState } from "react";
import {
  MissionSection,
  Title,
  Underline,
  CardandDescription,
  CardsContainer,
  Card,
  CardImage,
  CardTitle,
  CardDescription,
  DescriptionText,
  CTAButton,
  ModalOverlay,
  ModalContent,
  Input,
  TextArea,
  ButtonRow,
  SubmitButton,
  CancelButton,
  ErrorText,
} from "./Mission.styles";
import empower from "../../../assets/empowerment.png";
import excellence from "../../../assets/excellence.png";
import success from "../../../assets/success.png";


import { getMissions } from "../../../api/missionApi";
import { toast } from "react-toastify";
import { createSupport } from "../../../api/supportApi";

const Mission = () => {
  const [missionData, setMissionData] = React.useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await getMissions();
        setMissionData(data);
      } catch (err) {
        console.error("Error fetching missions:", err);
      }
    }
    fetchMissions();
  }, []);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;

      // You can integrate your API here
      console.log("Submitted Data:", formData);
      const response = await createSupport({ email: formData.email, description: formData.message, name: formData.name });
      toast.success("Message sent successfully", {
        
        autoClose: 2000,
        onClose: () => {
          setShowModal(false);
          setFormData({ name: "", email: "", message: "" });
        }
      });
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      // console.log(err);
      toast.error("Failed to send message");
    } finally {
      setShowModal(false);
    }

  };
  return (
    <MissionSection>
      <Title>Our Mission</Title>
      <Underline />
      <CardandDescription>
        <CardsContainer>
          {missionData.map((item, index) => (
            <Card key={index}>
              <CardImage src={item.image} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              {/* <CardDescription>{item.description}</CardDescription> */}
              <CardDescription dangerouslySetInnerHTML={{ __html: item.description }} />
            </Card>
          ))}
        </CardsContainer>
        <DescriptionText>
          At Mankavit, we are more than just an academy - we are a community of
          learners committed to success. Join us and take the first step toward
          your legal career.
        </DescriptionText>
      </CardandDescription>
      <CTAButton onClick={() => setShowModal(true)}>Contact Us</CTAButton>
      {showModal && (
        <ModalOverlay
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <ModalContent>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}

              <label>Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}

              <label>Message</label>
              <TextArea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              {errors.message && <ErrorText>{errors.message}</ErrorText>}

              <ButtonRow>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">Submit</SubmitButton>
              </ButtonRow>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </MissionSection>
  );
};

export default Mission;
