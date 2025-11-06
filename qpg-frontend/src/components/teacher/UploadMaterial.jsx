import axios from "axios";
import { useState, useEffect } from "react";

function UploadMaterial() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  // ✅ Fetch all materials on load
  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/materials");
      setMaterials(res.data);
    } catch (err) {
      console.error("❌ Failed to load materials:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // ✅ Upload new material
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8081/api/materials/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ " + res.data);
      setTitle("");
      setFile(null);
      fetchMaterials(); // refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed!");
    }
  };

  return (
    <div className="p-6">
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full sm:w-1/3"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {/* Material List */}
      <h3 className="text-lg font-semibold mb-3">📚 Uploaded Materials</h3>
      {materials.length === 0 ? (
        <p>No materials uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {materials.map((m) => (
            <li
              key={m.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <span>{m.title}</span>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View / Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UploadMaterial;
