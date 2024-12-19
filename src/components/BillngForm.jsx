import React, { useState } from 'react';

const BillingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to Checkout page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Billing Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default BillingForm;
