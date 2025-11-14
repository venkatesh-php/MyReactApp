import Topbar from "../welcome/topbar";

export default function Teachers() {
  return (
    <div>
      <Topbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Teachers Management</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>Teachers table and management interface will go here.</p>
        </div>
      </div>
    </div>
  );
}
