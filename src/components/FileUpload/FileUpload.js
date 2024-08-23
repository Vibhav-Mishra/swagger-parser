import React, { useState } from "react";
import "./FileUpload.css";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div className="file-upload">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
