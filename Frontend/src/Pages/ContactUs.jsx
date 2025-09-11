import React, { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: '', mobile: '', message: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-2 pb-5">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
        {success && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded text-center font-semibold">
            Message sent successfully!<br />
            School member will contact you shortly.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;