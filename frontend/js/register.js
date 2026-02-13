const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

const API_URL = "http://127.0.0.1:8000"; // your FastAPI backend

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirmPassword = document.getElementById("regConfirmPassword").value.trim();

  // Confirm password check
  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match!";
    registerMessage.className = "message error";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      registerMessage.textContent = "Registered successfully! You can now log in.";
      registerMessage.className = "message success";
      registerForm.reset();
    } else {
      registerMessage.textContent = "Error: " + data.detail;
      registerMessage.className = "message error";
    }
  } catch (err) {
    registerMessage.textContent = "Network error, try again later.";
    registerMessage.className = "message error";
  }
});
