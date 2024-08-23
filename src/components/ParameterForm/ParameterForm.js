import React from "react";
import "./ParameterForm.css";

const ParameterForm = ({ parameters }) => {
  const handleInputChange = (e, paramType) => {
    const value = e.target.value;

    if (paramType === "string") {
      e.target.value = value.replace(/[^a-zA-Z ]/g, "");
    } else if (paramType === "integer") {
      e.target.value = value.replace(/[^0-9]/g, "");
    } else if (paramType === "number") {
      e.target.value = value.replace(/[^0-9.]/g, "");
    }
  };

  return (
    <div className="parameter-form">
      <h3>Parameters:</h3>
      <form>
        {parameters.map((param, index) => (
          <div key={index} className="parameter-item">
            <label>
              <strong>{param.name}</strong> ({param.in}):{" "}
            </label>
            {param.enum ? (
              <select required>
                <option value="">Select an option</option>
                {param.enum.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={param.type === "string" ? "text" : param.type}
                placeholder={param.description}
                required
                onChange={(e) => handleInputChange(e, param.type)}
              />
            )}
            {param.schema && param.schema.properties && (
              <div className="nested-params">
                <h4>Nested Parameters:</h4>
                {Object.keys(param.schema.properties).map((key) => (
                  <div key={key}>
                    <label>
                      {key}: {param.schema.properties[key].type}
                    </label>
                    <input
                      type={
                        param.schema.properties[key].type === "string"
                          ? "text"
                          : param.schema.properties[key].type
                      }
                      required
                      onChange={(e) =>
                        handleInputChange(e, param.schema.properties[key].type)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ParameterForm;
