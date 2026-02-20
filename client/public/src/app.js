// Three.js D20 animation
const canvas = document.getElementById('d20-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(600, 600);
camera.position.z = 3;

const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x7f8072, wireframe: true });
const d20 = new THREE.Mesh(geometry, material);
scene.add(d20);

let floatOffset = 0;
function animate() {
  requestAnimationFrame(animate);
  d20.rotation.x += 0.002;
  d20.rotation.y += 0.003;
  floatOffset += 0.01;
  d20.position.y = Math.sin(floatOffset) * 0.2;
  renderer.render(scene, camera);
}
animate();

// Theme toggle
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  material.color.setHex(document.body.classList.contains("dark-mode") ? 0xffffff : 0x7f8072);
});

// Side panel logic
const sidePanel = document.getElementById('side-panel');
const panelTitle = document.getElementById('panel-title');
const panelForm = document.getElementById('panel-form');
const closePanel = document.getElementById('close-panel');
const panelMessage = document.getElementById('panel-message');
let pendingFirstUseReset = null;

document.getElementById('login-btn').addEventListener('click', () => {
  panelTitle.textContent = "Login";
  panelForm.dataset.type = "login";
  document.getElementById('panel-email').style.display = "none";
  document.getElementById('panel-username').disabled = false;
  document.getElementById('panel-password').placeholder = "Password";
  if (document.getElementById('panel-password-confirm'))
    document.getElementById('panel-password-confirm').style.display = "none";
  pendingFirstUseReset = null;
  sidePanel.classList.add('open');
});

document.getElementById('register-btn').addEventListener('click', () => {
  panelTitle.textContent = "Register";
  panelForm.dataset.type = "register";
  document.getElementById('panel-email').style.display = "block";
  document.getElementById('panel-username').disabled = false;
  document.getElementById('panel-password').placeholder = "Password";
  if (document.getElementById('panel-password-confirm'))
    document.getElementById('panel-password-confirm').style.display = "block";
  pendingFirstUseReset = null;
  sidePanel.classList.add('open');
});

closePanel.addEventListener('click', () => sidePanel.classList.remove('open'));

function setFirstUseResetMode(username, currentPassword) {
  pendingFirstUseReset = { username, currentPassword };
  panelTitle.textContent = "Reset Password";
  panelForm.dataset.type = "first_use_reset";
  document.getElementById('panel-email').style.display = "none";
  const usernameInput = document.getElementById('panel-username');
  const passwordInput = document.getElementById('panel-password');
  const confirmInput = document.getElementById('panel-password-confirm');
  usernameInput.value = username;
  usernameInput.disabled = true;
  passwordInput.value = "";
  passwordInput.placeholder = "New Password";
  if (confirmInput) {
    confirmInput.value = "";
    confirmInput.style.display = "block";
  }
}

// Show success or error messages
function showPanelMessage(text, type = 'error') {
  panelMessage.textContent = text;
  panelMessage.style.backgroundColor = type === 'error' ? 'rgba(255,0,0,0.15)' : 'rgba(0,255,0,0.15)';
  panelMessage.style.color = type === 'error' ? 'red' : 'green';
  panelMessage.style.display = 'block';
  
  setTimeout(() => {
    panelMessage.style.display = 'none';
  }, 4000);
}

function validatePassword(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (password.length < minLength) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasUpper) {
    return "Password must include at least one uppercase letter.";
  }
  if (!hasLower) {
    return "Password must include at least one lowercase letter.";
  }
  if (!hasNumber) {
    return "Password must include at least one number.";
  }
  if (!hasSpecial) {
    return "Password must include at least one special character.";
  }

  return null; // valid
}

// Handle form submit
panelForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = panelForm.dataset.type; // 'login' or 'register'
  const username = document.getElementById('panel-username').value.trim();
  const password = document.getElementById('panel-password').value.trim();
  const emailInput = document.getElementById('panel-email');
  const email = emailInput.style.display !== 'none' ? emailInput.value.trim() : null;

  if (type === 'first_use_reset') {
    const confirmInput = document.getElementById('panel-password-confirm');
    const confirmPassword = confirmInput ? confirmInput.value.trim() : '';
    if (!pendingFirstUseReset) {
      showPanelMessage('Session expired. Please login again.', 'error');
      panelForm.dataset.type = "login";
      document.getElementById('panel-username').disabled = false;
      return;
    }
    if (password !== confirmPassword) {
      showPanelMessage('Passwords do not match', 'error');
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      showPanelMessage(passwordError, 'error');
      return;
    }
    try {
      const resetRes = await fetch('/auth/first-use-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: pendingFirstUseReset.username,
          current_password: pendingFirstUseReset.currentPassword,
          new_password: password
        })
      });
      const resetData = await resetRes.json().catch(() => ({}));
      if (!resetRes.ok) {
        showPanelMessage(resetData?.detail || 'Failed to reset password', 'error');
        return;
      }
      showPanelMessage('Password reset complete. Logged in successfully!', 'success');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
      return;
    } catch (err) {
      console.error(err);
      showPanelMessage('Network error', 'error');
      return;
    }
  }

  // Front-end password confirm only for registration
  // Front-end validation only for registration
  if (type === 'register') {

    const passwordConfirmInput = document.getElementById('panel-password-confirm');
    const passwordConfirm = passwordConfirmInput.value.trim();

    // Confirm password match
    if (password !== passwordConfirm) {
      showPanelMessage('Passwords do not match', 'error');
      return;
    }

    // Password complexity check
    const passwordError = validatePassword(password);
    if (passwordError) {
      showPanelMessage(passwordError, 'error');
      return;
    }
  }

  if (!username || !password || (type === 'register' && !email)) {
    showPanelMessage('Please fill out all fields', 'error');
    return;
  }

  try {
    let res;

    if (type === 'register') {
      // Registration expects JSON
      res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, email })
      });
    } else {
      // Login expects form-urlencoded
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: formData
      });
    }

    const data = await res.json();

  if (!res.ok) {
    if (type === 'login' && data?.detail === 'PASSWORD_RESET_REQUIRED') {
      setFirstUseResetMode(username, password);
      showPanelMessage('Password reset required. Enter a new password.', 'error');
      return;
    }

    let message = '';

    if (Array.isArray(data)) {
      // Extract msg safely
      message = data.map(err => {
        if (typeof err.msg === 'string') return err.msg;
        // If err.msg is an object (like your password complexity)
        if (typeof err.msg === 'object' && err.msg !== null) {
          // Try to get error.message or just JSON stringify
          return err.msg.message || JSON.stringify(err.msg);
        }
        return JSON.stringify(err);
      }).join('\n');
    } else if (data.detail) {
      message = data.detail;
    } else {
      message = 'Something went wrong';
    }

    showPanelMessage(message, 'error');
    return;
  }


    showPanelMessage(
      type === 'register'
        ? 'Registered successfully!'
        : 'Logged in successfully!',
      'success'
    );

    if (type === 'login') {
      // Redirect to dashboard after login
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
    } else {
      // Just close panel after registration
      setTimeout(() => {
        sidePanel.classList.remove('open');
      }, 800);
    }

    setTimeout(() => sidePanel.classList.remove('open'), 500);
  } catch (err) {
    console.error(err);
    showPanelMessage('Network error', 'error');
  }
});
