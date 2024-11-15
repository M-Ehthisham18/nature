import React, { useState } from "react";
import axios from "axios";

const AddPledgeForm = () => {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      // Replace with the correct user ID if required
      const userId = 1; 
      const response = await axios.post("http://127.0.0.1:8000/api/pledges/", {
        user: userId,
        description: description,
      });

      if (response.status === 201) {
        setMessage("Pledge added successfully!");
        setDescription(""); // Clear the form
      }
    } catch (error) {
      setMessage("Error adding pledge. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Add a New Pledge</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="description" className="block mb-2 text-gray-700 font-medium">
          Pledge Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPledgeForm;
