// 1. Define the Base URL from your environment variables
const BASE_URL = process.env.REACT_APP_API_URL || ""; 

export async function uploadCsvFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  // 2. Attach the BASE_URL to the front of the path
  const response = await fetch(`${BASE_URL}/predict/upload`, {
    method: "POST",
    body: formData
  });

  const rawBody = await response.text();
  let data = {};

  if (rawBody) {
    try {
      data = JSON.parse(rawBody);
    } catch {
      data = { detail: rawBody };
    }
  }

  if (!response.ok) {
    throw new Error(data.detail || `Upload failed with status ${response.status}`);
  }

  return data;
}

export async function fetchLenderDashboard() {
  // 2. Attach the BASE_URL here too
  const response = await fetch(`${BASE_URL}/predict/lender-dashboard`);
  const rawBody = await response.text();
  let data = {};

  if (rawBody) {
    try {
      data = JSON.parse(rawBody);
    } catch {
      data = { detail: rawBody };
    }
  }

  if (!response.ok) {
    throw new Error(data.detail || `Lender dashboard failed with status ${response.status}`);
  }

  return data;
}