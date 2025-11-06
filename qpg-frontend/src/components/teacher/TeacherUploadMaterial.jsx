import React from "react";
import UploadMaterial from "../components/UploadMaterial";

function TeacherUploadMaterial() {
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        📄 Upload Study Materials
      </h2>
      <UploadMaterial />
    </div>
  );
}

export default TeacherUploadMaterial;
