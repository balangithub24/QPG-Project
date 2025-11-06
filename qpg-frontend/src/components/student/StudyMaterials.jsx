import axios from "axios";
import { useEffect, useState } from "react";

function StudyMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/materials")
      .then(res => setMaterials(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📚 Study Materials</h2>
      {materials.length === 0 ? (
        <p>No materials available.</p>
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

export default StudyMaterials;
