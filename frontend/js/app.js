// ==============================
// Tavern Frontend - app.js
// ==============================

const API_URL = "http://127.0.0.1:8000";

document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  const registerMessage = document.getElementById("registerMessage");
  const loginMessage = document.getElementById("loginMessage");

  // ==============================
  // Helper: Display Message
  // ==============================
  function showMessage(element, message, type = "success") {
    if (!element) return;

    element.classList.add("message");
    element.textContent = message;
    element.classList.remove("success", "error");
    element.classList.add(type);

    setTimeout(() => {
      element.textContent = "";
      element.classList.remove("success", "error");
    }, 5000);
  }

  // ==============================
  // Safe Fetch
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
    } catch {
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
      const confirm = document.getElementById("regConfirm").value.trim();

      if (!username || !password || !confirm) {
        showMessage(registerMessage, "All fields are required.", "error");
        return;
      }

      if (password !== confirm) {
        showMessage(registerMessage, "Passwords do not match.", "error");
        return;
      }

      const { ok, data } = await safeFetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (ok) {
        showMessage(registerMessage, "✅ Registered successfully! Redirecting to login...", "success");
        registerForm.reset();
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
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
        localStorage.setItem("tavern_jwt", data.access_token);
        showMessage(loginMessage, "✅ Login successful! Redirecting...", "success");
        loginForm.reset();
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1200);
      } else {
        showMessage(loginMessage, "❌ " + data.detail, "error");
      }
    });
  }
});
