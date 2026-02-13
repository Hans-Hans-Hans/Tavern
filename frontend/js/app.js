// Tavern frontend app.js

const API_URL = "http://127.0.0.1:8000"; // FastAPI backend

// Elements (check if they exist first)
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");

// -------------------------
// Helper: fetch wrapper with error handling
// -------------------------
async function safeFetch(url, options) {
  try {
    const response = await fetch(url, options);
    let data;
    try {
      data = await response.json();
    } catch {
      data = { detail: "Server error or invalid response" };
    }
    return { ok: response.ok, data };
  } catch (err) {
    return { ok: false, data: { detail: err.message } };
  }
}

// -------------------------
// Register
// -------------------------
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    const { ok, data } = await safeFetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (ok) {
      registerMessage.textContent = "✅ Registered successfully!";
      registerForm.reset();
    } else {
      registerMessage.textContent = "❌ Error: " + data.detail;
    }
  });
}

// -------------------------
// Login
// -------------------------
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const { ok, data } = await safeFetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (ok) {
      loginMessage.textContent = "✅ Login successful!";
      localStorage.setItem("jwt", data.access_token); // Save JWT
      loginForm.reset();
    } else {
      loginMessage.textContent = "❌ Error: " + data.detail;
    }
  });
}

// -------------------------
// Future: helper for authenticated requests
// -------------------------
async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("jwt");
  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = "Bearer " + token;
  return await safeFetch(`${API_URL}${endpoint}`, options);
}
