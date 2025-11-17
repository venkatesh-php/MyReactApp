import Topbar from "../../welcome/topbar";
import { useEffect, useState } from "react";
import { Link } from "react-router";

// Read the base app URL from Vite env var `VITE_APP_URL`.
const APP_URL = (import.meta.env.VITE_APP_URL as string);

interface Teacher {
  _id?: string;
  fullname: string;
  class: string;
  gender: string;
  age: number;
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APP_URL}/getTeachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Teachers data:", data);

      const teachersList = Array.isArray(data) ? data : data.data || [];
      setTeachers(teachersList);
      setError(null);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch teacher data. Please check if the backend server is running.";
      setError(errorMessage);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId: string | undefined) => {
    if (!teacherId) {
      alert("Teacher ID is missing");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${APP_URL}/deleteTeacher/${teacherId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Teacher deleted successfully");
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Failed to delete teacher. Please try again.");
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Teachers Management</h2>
          <Link
            to="/teachers/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Teacher
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading teachers...</p>
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left font-medium">Name</th>
                    <th className="px-6 py-3 text-left font-medium">Class</th>
                    <th className="px-6 py-3 text-left font-medium">Gender</th>
                    <th className="px-6 py-3 text-left font-medium">Age</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                      <tr key={teacher._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{teacher.fullname}</td>
                        <td className="px-6 py-3">{teacher.class}</td>
                        <td className="px-6 py-3">{teacher.gender}</td>
                        <td className="px-6 py-3">{teacher.age}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <Link
                              to={`/teachers/edit/${teacher._id}`}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(teacher._id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b hover:bg-gray-50">
                      <td colSpan={5} className="px-6 py-3 text-center text-gray-500">
                        No teachers added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
