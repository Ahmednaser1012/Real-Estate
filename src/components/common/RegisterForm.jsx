import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredLocation: "",
    propertyType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Close the form after showing success message
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    }, 1000);

    // In a real application, you would send this data to your backend
    // fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //   setIsSubmitting(false);
    //   setSubmitSuccess(true);
    //   setTimeout(() => {
    //     if (onClose) onClose();
    //   }, 2000);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    //   setIsSubmitting(false);
    // });
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="icon-box !h-14 !w-14 !bg-green-500 text-white mx-auto text-2xl">
          <FiSend />
        </div>
        <h3 className="mt-4 text-xl font-semibold">Thank You!</h3>
        <p className="mt-2">
          Your registration has been received. We'll contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
          placeholder="Your email"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
          placeholder="Your phone number"
          required
        />
      </div>

      <div>
        <label
          htmlFor="preferredLocation"
          className="block text-sm font-medium mb-1"
        >
          Preferred Location
        </label>
        <input
          type="text"
          id="preferredLocation"
          name="preferredLocation"
          value={formData.preferredLocation}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
          placeholder="e.g., New Cairo, 6th of October, Downtown"
        />
      </div>

      <div>
        <label
          htmlFor="propertyType"
          className="block text-sm font-medium mb-1"
        >
          Property Type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md outline-none bg-slate-100 dark:bg-hover-color-dark opacity-70"
        >
          <option className="text-slate-800" value="">
            Select property type
          </option>
          <option className="text-slate-800" value="apartment">
            Apartment
          </option>
          
          <option className="text-slate-800" value="studio">Studio</option>
          <option className="text-slate-800" value="duplex">Duplex</option>
          <option className="text-slate-800" value="commercial">Commercial</option>
          <option className="text-slate-800" value="office">Office</option>
          <option className="text-slate-800" value="other">Other</option>
        </select>
      </div>

       
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border rounded-md outline-none bg-transparent dark:border-gray-700"
          placeholder="Tell us about your interest"
        ></textarea>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register Now"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
