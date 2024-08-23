import React, { useState } from "react";
import "./ResourceDropdown.css";

const ResourceDropdown = ({ resources, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedValue(selected);
    onSelect(selected);
  };

  return (
    <div className="resource-dropdown">
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Select a resource</option>
        {resources.map((resource, index) => (
          <option key={index} value={`${resource.path}|${resource.method}`}>
            {resource.path} ({resource.method.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResourceDropdown;
