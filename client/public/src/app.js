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
let dragSpinX = 0;
let dragSpinY = 0;
let pointerActive = false;
let activePointerId = null;
let lastPointer = null;

function pointerInsideD20(event) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  const x = event.clientX;
  const y = event.clientY;
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return false;
  const nx = ((x - rect.left) / rect.width) * 2 - 1;
  const ny = ((y - rect.top) / rect.height) * 2 - 1;
  return ((nx * nx) + (ny * ny)) <= 0.92;
}

canvas.addEventListener("pointerdown", (event) => {
  if (!pointerInsideD20(event)) return;
  pointerActive = true;
  activePointerId = event.pointerId;
  lastPointer = { x: event.clientX, y: event.clientY };
  try { canvas.setPointerCapture(event.pointerId); } catch {}
  event.preventDefault();
});

document.addEventListener("pointermove", (event) => {
  if (!pointerActive) return;
  if (activePointerId != null && event.pointerId !== activePointerId) return;
  if (!lastPointer) return;
  const dx = event.clientX - lastPointer.x;
  const dy = event.clientY - lastPointer.y;
  lastPointer = { x: event.clientX, y: event.clientY };
  dragSpinY += dx * 0.003;
  dragSpinX += dy * 0.003;
  event.preventDefault();
}, { passive: false });

function endPointerDrag(event) {
  if (activePointerId != null && event?.pointerId != null && event.pointerId !== activePointerId) return;
  pointerActive = false;
  activePointerId = null;
  lastPointer = null;
}

document.addEventListener("pointerup", endPointerDrag);
document.addEventListener("pointercancel", endPointerDrag);

function animate() {
  requestAnimationFrame(animate);
  dragSpinX *= 0.955;
  dragSpinY *= 0.955;
  d20.rotation.x += 0.002 + dragSpinX;
  d20.rotation.y += 0.003 + dragSpinY;
  floatOffset += 0.01;
  d20.position.y = Math.sin(floatOffset) * 0.2;
  renderer.render(scene, camera);
}
animate();

// Theme toggle
const toggle = document.getElementById("theme-toggle");
const cacheMetaEl = document.getElementById("cache-meta");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  material.color.setHex(document.body.classList.contains("dark-mode") ? 0xffffff : 0x7f8072);
});

const TAVERN_DESKTOP_SERVER_URL_KEY = "tavern.desktopServerUrl";
const TAVERN_REMEMBER_ME_PREF_KEY = "tavern.rememberMePreference";

function getConfiguredServerOrigin() {
  let candidate = "";
  try {
    candidate = String(window.__TAVERN_SERVER_URL__ || "").trim();
  } catch {
    candidate = "";
  }
  if (!candidate) {
    try {
      candidate = String(localStorage.getItem(TAVERN_DESKTOP_SERVER_URL_KEY) || "").trim();
    } catch {
      candidate = "";
    }
  }
  if (!candidate) {
    try {
      const param = new URLSearchParams(window.location.search).get("server");
      candidate = String(param || "").trim();
      if (candidate) localStorage.setItem(TAVERN_DESKTOP_SERVER_URL_KEY, candidate);
    } catch {
      candidate = "";
    }
  }
  if (!candidate) return "";
  try {
    const url = new URL(candidate);
    if (!/^https?:$/i.test(url.protocol)) return "";
    return url.origin;
  } catch {
    return "";
  }
}

function resolveApiUrl(input) {
  if (typeof input !== "string") return input;
  if (!input.startsWith("/")) return input;
  const origin = getConfiguredServerOrigin();
  return origin ? `${origin}${input}` : input;
}

function getDashboardPageHref() {
  return getConfiguredServerOrigin() ? "dashboard.html" : "/dashboard";
}

function isStandalonePwaMode() {
  try {
    const standaloneMedia = typeof window.matchMedia === "function"
      ? window.matchMedia("(display-mode: standalone)").matches
      : false;
    const iosStandalone = window.navigator?.standalone === true;
    return Boolean(standaloneMedia || iosStandalone);
  } catch {
    return false;
  }
}

function getRememberMePreference() {
  try {
    const raw = localStorage.getItem(TAVERN_REMEMBER_ME_PREF_KEY);
    if (raw === "true") return true;
    if (raw === "false") return false;
  } catch {
    // Ignore storage read failures.
  }
  return null;
}

function setRememberMePreference(value) {
  try {
    localStorage.setItem(TAVERN_REMEMBER_ME_PREF_KEY, value ? "true" : "false");
  } catch {
    // Ignore storage write failures.
  }
}

function getDefaultRememberMeValue() {
  const preferred = getRememberMePreference();
  if (preferred !== null) return preferred;
  return isStandalonePwaMode();
}

function getVersionFromUrl(urlLike) {
  if (!urlLike) return "";
  try {
    const url = new URL(urlLike, window.location.origin);
    return String(url.searchParams.get("v") || "").trim();
  } catch {
    return "";
  }
}

function detectLandingCacheVersion() {
  const scriptVersion = getVersionFromUrl(
    document.querySelector('script[src*="src/app.js"]')?.getAttribute("src") || ""
  );
  if (scriptVersion) return scriptVersion;
  const manifestVersion = getVersionFromUrl(
    document.querySelector('link[rel="manifest"]')?.getAttribute("href") || ""
  );
  return manifestVersion || "";
}

function renderLandingCacheMeta() {
  if (!cacheMetaEl) return;
  const version = detectLandingCacheVersion();
  cacheMetaEl.textContent = version ? `cache ${version}` : "cache -";
  cacheMetaEl.title = version ? `Client cache version: ${version}` : "Client cache version unavailable";
}

renderLandingCacheMeta();

const originalFetch = window.fetch.bind(window);
window.fetch = (...args) => {
  const resolvedArgs = [...args];
  if (resolvedArgs.length > 0) resolvedArgs[0] = resolveApiUrl(resolvedArgs[0]);
  return originalFetch(...resolvedArgs);
};

// Side panel logic
const sidePanel = document.getElementById('side-panel');
const panelTitle = document.getElementById('panel-title');
const panelForm = document.getElementById('panel-form');
const closePanel = document.getElementById('close-panel');
const panelMessage = document.getElementById('panel-message');
const panelRememberWrap = document.getElementById('panel-remember-wrap');
const panelRememberMe = document.getElementById('panel-remember-me');
const panelSubmitBtn = document.getElementById('panel-submit');
let pendingFirstUseReset = null;

function resetPanelAuthFields() {
  const emailInput = document.getElementById('panel-email');
  const usernameInput = document.getElementById('panel-username');
  const passwordInput = document.getElementById('panel-password');
  const confirmInput = document.getElementById('panel-password-confirm');
  const verificationCodeInput = document.getElementById('panel-verification-code');
  if (emailInput) {
    emailInput.style.display = "none";
    emailInput.readOnly = false;
  }
  if (usernameInput) {
    usernameInput.style.display = "block";
    usernameInput.disabled = false;
  }
  if (passwordInput) {
    passwordInput.style.display = "block";
    passwordInput.disabled = false;
    passwordInput.placeholder = "Password";
  }
  if (confirmInput) {
    confirmInput.style.display = "none";
    confirmInput.disabled = false;
  }
  if (verificationCodeInput) {
    verificationCodeInput.style.display = "none";
    verificationCodeInput.disabled = false;
    verificationCodeInput.value = "";
  }
}

document.getElementById('login-btn').addEventListener('click', () => {
  resetPanelAuthFields();
  panelTitle.textContent = "Login";
  panelForm.dataset.type = "login";
  if (panelSubmitBtn) panelSubmitBtn.textContent = "Submit";
  if (panelRememberWrap) panelRememberWrap.style.display = "flex";
  if (panelRememberMe) panelRememberMe.checked = getDefaultRememberMeValue();
  pendingFirstUseReset = null;
  sidePanel.classList.add('open');
});

document.getElementById('register-btn').addEventListener('click', () => {
  resetPanelAuthFields();
  panelTitle.textContent = "Register";
  panelForm.dataset.type = "register";
  document.getElementById('panel-email').style.display = "block";
  if (document.getElementById('panel-password-confirm'))
    document.getElementById('panel-password-confirm').style.display = "block";
  const registrationCodeInput = document.getElementById('panel-verification-code');
  if (registrationCodeInput) registrationCodeInput.style.display = "block";
  if (panelSubmitBtn) panelSubmitBtn.textContent = "Create Account";
  if (panelRememberWrap) panelRememberWrap.style.display = "none";
  pendingFirstUseReset = null;
  sidePanel.classList.add('open');
});

closePanel.addEventListener('click', () => sidePanel.classList.remove('open'));

if (panelRememberMe) {
  panelRememberMe.checked = getDefaultRememberMeValue();
  panelRememberMe.addEventListener("change", () => {
    setRememberMePreference(Boolean(panelRememberMe.checked));
  });
}

function setFirstUseResetMode(username, currentPassword, rememberMe) {
  resetPanelAuthFields();
  pendingFirstUseReset = { username, currentPassword, rememberMe: Boolean(rememberMe) };
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
  if (panelRememberWrap) panelRememberWrap.style.display = "none";
  if (panelSubmitBtn) panelSubmitBtn.textContent = "Submit";
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
  const verificationCodeInput = document.getElementById('panel-verification-code');
  const registrationCode = verificationCodeInput && verificationCodeInput.style.display !== 'none'
    ? verificationCodeInput.value.trim()
    : "";
  const rememberMe = !!(panelRememberMe && panelRememberMe.checked);
  if (type === "login") {
    setRememberMePreference(rememberMe);
  }

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
          new_password: password,
          remember_me: Boolean(pendingFirstUseReset.rememberMe)
        })
      });
      const resetData = await resetRes.json().catch(() => ({}));
      if (!resetRes.ok) {
        showPanelMessage(resetData?.detail || 'Failed to reset password', 'error');
        return;
      }
      showPanelMessage('Password reset complete. Logged in successfully!', 'success');
      setTimeout(() => {
        window.location.href = getDashboardPageHref();
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
      res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, email, registration_code: registrationCode || null })
      });
    } else {
      // Login expects form-urlencoded
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('remember_me', rememberMe ? 'true' : 'false');

      res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'include',
        body: formData
      });
    }

    let data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (type === 'login' && data?.detail === 'PASSWORD_RESET_REQUIRED') {
      setFirstUseResetMode(username, password, rememberMe);
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


    if (type === 'register') {
      showPanelMessage('Account created successfully!', 'success');
      setTimeout(() => sidePanel.classList.remove('open'), 500);
      return;
    }

    showPanelMessage('Logged in successfully!', 'success');
    if (type === 'login') {
      // Redirect to dashboard after login
      setTimeout(() => {
        window.location.href = getDashboardPageHref();
      }, 800);
    }

    setTimeout(() => sidePanel.classList.remove('open'), 500);
  } catch (err) {
    console.error(err);
    showPanelMessage('Network error', 'error');
  }
});
