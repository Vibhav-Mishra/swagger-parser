import React, { useState } from "react";
import FileUpload from "../FileUpload/FileUpload";
import ResourceDropdown from "../ResourceDropdown/ResourceDropdown";
import ParameterForm from "../ParameterForm/ParameterForm";
import { uploadSwaggerFile, fetchParameters } from "../../utils/api";
import "./SwaggerForm.css";

const SwaggerForm = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [parameters, setParameters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = async (file) => {
    try {
      const resources = await uploadSwaggerFile(file);
      setResources(resources);
      setSelectedResource(null);
      setParameters([]);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(`Error! ${error.message}`);
    }
  };

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
    setParameters([]);
    setErrorMessage("");
  };

  const handleTryButton = async () => {
    if (selectedResource) {
      try {
        const parameters = await fetchParameters(selectedResource);
        setParameters(parameters);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(`Error fetching parameters: ${error.message}`);
      }
    } else {
      setErrorMessage("Please select a resource");
    }
  };

  return (
    <div>
      <h1>Swagger Parser</h1>
      <div className="form-container">
        <div className="file-form">
          <FileUpload onUpload={handleFileUpload} />
          {resources.length > 0 && (
            <ResourceDropdown
              resources={resources}
              onSelect={handleResourceSelect}
            />
          )}
          {selectedResource && (
            <button className="try-button" onClick={handleTryButton}>
              TRY
            </button>
          )}
        </div>
        {parameters.length > 0 && <ParameterForm parameters={parameters} />}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default SwaggerForm;
