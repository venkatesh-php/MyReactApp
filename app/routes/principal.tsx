import Topbar from "../welcome/topbar";

export default function Principal() {
  return (
    <div>
      <Topbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Principal Dashboard</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p>Principal information and dashboard will go here.</p>
        </div>
      </div>
    </div>
  );
}
