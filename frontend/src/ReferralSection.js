import React, { useState } from 'react';
import axios from 'axios';

function ReferralSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    number:'',
    // Add more fields as needed
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit-form', formData);
      alert('Form submitted successfully!');
      // Optionally clear form fields after submission
      setFormData({
        name: '',
        city: '',
        email: '',
        number:'',
      });
      setShowPopup(false); // Close form popup after submission
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto">
        <div className="referral-section text-center">
          <h2 className="text-3xl font-bold mb-8">How Do I <span className="text-blue-500">Refer?</span></h2>
          <div className="steps-container flex justify-center items-center space-x-8">
            <div className="step">
              <img src="./images/add.png" alt="Submit Referrals" className="mx-auto" />
              <p className="mt-4">Submit referrals easily via our website's referral section.</p>
            </div>
            <div className="step">
              <img src="./images/write.png" alt="Earn Rewards" className="mx-auto" />
              <p className="mt-4">Earn rewards once your referral joins an Accredian program.</p>
            </div>
            <div className="step">
              <img src="./images/calender.png" alt="Receive Bonus" className="mx-auto" />
              <p className="mt-4">Both parties receive a bonus 30 days after program enrollment.</p>
            </div>
          </div>
        </div>
        <div className="button-container text-center mt-8">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg" onClick={togglePopup}>Refer Now</button>
        </div>
        {showPopup && (
          <div className="popup fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="popup-inner w-[400px] bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Refer Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 bg-gray-400 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 bg-gray-400 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 bg-gray-400 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Number</label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 bg-gray-400 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                {/* Add more fields as needed */}
                <div className="text-center">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
                  <button type="button" className="ml-2 text-gray-600" onClick={togglePopup}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReferralSection;
