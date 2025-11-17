import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Topbar from "../../welcome/topbar";

const APP_URL = (import.meta.env.VITE_APP_URL as string);

export default function StudentDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteStudent = async () => {
      if (!id) {
        alert("Student ID is missing");
        navigate("/students");
        return;
      }

      try {
        const response = await fetch(`${APP_URL}/deleteStudent/${id}`,
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
        alert("Student deleted successfully!");
        navigate("/students");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
        navigate("/students");
      }
    };

    deleteStudent();
  }, [id, navigate]);

  return (
    <div>
      <Topbar />
      <div className="container mx-auto p-6">
        <p className="text-center text-gray-600">Deleting student...</p>
      </div>
    </div>
  );
}
