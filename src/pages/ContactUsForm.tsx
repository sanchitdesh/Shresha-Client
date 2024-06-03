// ContactForm.jsx

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: ""
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/contact/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: ""
        });
      } else {
        setResponseMessage(result.message || "Failed to send message.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending the message.");
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-heading">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Phone:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default ContactForm;
