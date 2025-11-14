import { useState } from "react";
import { useNavigate } from "react-router";
import Topbar from "../../welcome/topbar";

export default function StudentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    class: "",
    gender: "",
    age: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullname ||
      !formData.class ||
      !formData.gender ||
      !formData.age
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/postStudentsData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      setError(null);
      setSubmitted(true);

      // Reset form
      setFormData({
        fullname: "",
        class: "",
        gender: "",
        age: "",
      });

      // Show success message
      setTimeout(() => {
        setSubmitted(false);
        navigate("/students");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit student data. Please check if the backend server is running on http://localhost:3000";
      setError(errorMessage);
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullname: "",
      class: "",
      gender: "",
      age: "",
    });
  };

  return (
    <div>
      <Topbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Add New Student</h2>

        {submitted && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Student added successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter student full name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Class */}
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                Class
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="25"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-medium hover:bg-gray-500 transition"
              >
                Reset
              </button>
            </div>
          </form>

          <button
            onClick={() => navigate("/students")}
            className="w-full mt-4 text-blue-600 py-2 rounded-lg font-medium hover:text-blue-800 transition"
          >
            Back to Students
          </button>
        </div>
      </div>
    </div>
  );
}
