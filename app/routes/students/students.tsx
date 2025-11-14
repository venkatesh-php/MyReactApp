import { useEffect, useState } from "react";
import { Link } from "react-router";
import Topbar from "../../welcome/topbar";

interface Student {
  _id?: string;
  fullname: string;
  class: string;
  gender: string;
  age: number;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/getStudentsData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Students data:", data);

      // Handle both array and object with data property
      const studentsList = Array.isArray(data) ? data : data.data || [];
      setStudents(studentsList);
      setError(null);
    } catch (error) {
      console.error("Error fetching students:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch student data. Please check if the backend server is running.";
      setError(errorMessage);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (studentId: string | undefined) => {
    if (!studentId) {
      alert("Student ID is missing");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/deleteStudent/${studentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Student deleted successfully");
      // Refresh the list
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Students Management</h2>
          <Link
            to="/students/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Add Student
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading students...</p>
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
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-3">{student.fullname}</td>
                        <td className="px-6 py-3">{student.class}</td>
                        <td className="px-6 py-3">{student.gender}</td>
                        <td className="px-6 py-3">{student.age}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <Link
                              to={`/students/edit/${student._id}`}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(student._id)}
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
                        No students added yet
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
