// ==============================
// Tavern Frontend - app.js
// ==============================

const API_URL = "http://127.0.0.1:8000";

// Form elements (may not exist on every page)
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");

// ==============================
// Helper: Display Message
// ==============================
function showMessage(element, message, type = "success") {
  if (!element) return;

  element.classList.add("message"); // Ensure base class exists
  element.textContent = message;
  element.classList.remove("success", "error");
  element.classList.add(type);

  setTimeout(() => {
    element.textContent = "";
    element.classList.remove("success", "error");
  }, 10000);
}

// ==============================
// Helper: Safe Fetch
// ==============================
async function safeFetch(url, options) {
  try {
    const response = await fetch(url, options);

    let data;
    try {
      data = await response.json();
    } catch {
      data = { detail: "Invalid server response" };
    }

    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { detail: "Failed to connect to server" } };
  }
}

// ==============================
// Register
// ==============================
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!username || !password) {
      showMessage(registerMessage, "All fields are required.", "error");
      return;
    }

    const { ok, data } = await safeFetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (ok) {
      showMessage(registerMessage, "✅ Registered successfully!", "success");
      registerForm.reset();
    } else {
      showMessage(registerMessage, "❌ " + data.detail, "error");
    }
  });
}

// ==============================
// Login
// ==============================
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
      showMessage(loginMessage, "All fields are required.", "error");
      return;
    }

    const { ok, data } = await safeFetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (ok) {
      // Save JWT for authenticated requests
      localStorage.setItem("tavern_jwt", data.access_token);

      showMessage(loginMessage, "✅ Login successful!", "success");

      loginForm.reset();

      // Optional: redirect after login
      // setTimeout(() => {
      //   window.location.href = "dashboard.html";
      // }, 1000);
    } else {
      showMessage(loginMessage, "❌ " + data.detail, "error");
    }
  });
}

// ==============================
// Authenticated Fetch Helper
// ==============================
async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("tavern_jwt");

  if (!token) {
    return { ok: false, data: { detail: "Not authenticated" } };
  }

  if (!options.headers) {
    options.headers = {};
  }

  options.headers["Authorization"] = `Bearer ${token}`;

  return await safeFetch(`${API_URL}${endpoint}`, options);
}
