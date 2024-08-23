import axios from "axios";

export const uploadSwaggerFile = async (file) => {
  const formData = new FormData();
  formData.append("swagger", file);

  const response = await axios.post("http://localhost:3000/swagger", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const fetchParameters = async (selectedResource) => {
  const [selectedPath, selectedMethod] = selectedResource.split("|");

  if (selectedPath && selectedMethod) {
    const response = await axios.post("http://localhost:3000/parameters", {
      path: selectedPath,
      method: selectedMethod,
    });

    return response.data;
  }

  throw new Error("Invalid resource selection");
};
