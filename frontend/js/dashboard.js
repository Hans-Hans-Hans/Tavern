// ==============================
// Tavern Dashboard JS
// ==============================

// -------------------
// Backend API URL
// -------------------
//const API_URL = "http://127.0.0.1:8000"; // FastAPI backend

// -------------------
// Authenticated Fetch Helper
// -------------------
async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem("tavern_jwt");
  if (!token) {
    console.warn("No JWT found, redirecting to login...");
    window.location.href = "login.html";
    return { ok: false, data: { detail: "Not authenticated" } };
  }

  // Merge headers safely
  options.headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    let data;
    try { data = await res.json(); } 
    catch { data = { detail: "Invalid server response" }; }
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Fetch failed:", err);
    return { ok: false, data: { detail: "Failed to connect to server" } };
  }
}


// -------------------
// Check JWT & redirect if missing
// -------------------
(function checkToken() {
  const token = localStorage.getItem("tavern_jwt");
  if (!token) {
    console.warn("No JWT found, redirecting to login...");
    window.location.href = "login.html";
  }
})();



// -------------------
// DOM Elements
// -------------------
const tavernList = document.getElementById("tavern-list");
const channelList = document.getElementById("channel-list");
const messagesUl = document.getElementById("messages");
const channelHeader = document.getElementById("channel-header");

// Current selection
let currentTavern = null;
let currentChannel = null;

// -------------------
// Fetch Taverns
// -------------------
async function fetchTaverns() {
  console.log("Fetching taverns...");
  const res = await authFetch("/taverns");
  if (!res.ok) {
    console.error("Failed to fetch taverns:", res.data.detail);
    return alert("Error fetching taverns: " + res.data.detail);
  }
  renderTaverns(res.data);
}

// -------------------
// Render Taverns
// -------------------
function renderTaverns(taverns) {
  tavernList.innerHTML = "";
  taverns.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.name;
    li.classList.add("clickable-item");
    li.addEventListener("click", () => selectTavern(t));
    tavernList.appendChild(li);
  });
}

// -------------------
// Select Tavern
// -------------------
async function selectTavern(tavern) {
  currentTavern = tavern;
  console.log("Selected tavern:", tavern.name);
  channelHeader.textContent = `Channels in ${tavern.name}`;

  const res = await authFetch(`/taverns/${tavern.id}/channels`);
  if (!res.ok) {
    console.error("Failed to fetch channels:", res.data.detail);
    return alert("Error fetching channels: " + res.data.detail);
  }
  renderChannels(res.data);
}

// -------------------
// Render Channels
// -------------------
function renderChannels(channels) {
  channelList.innerHTML = "";
  channels.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c.name;
    li.classList.add("clickable-item");
    li.addEventListener("click", () => selectChannel(c));
    channelList.appendChild(li);
  });
}

// -------------------
// Select Channel
// -------------------
function selectChannel(channel) {
  currentChannel = channel;
  console.log("Selected channel:", channel.name);
  messagesUl.innerHTML = "";
  fetchMessages();
}

// -------------------
// Fetch Messages
// -------------------
async function fetchMessages() {
  if (!currentChannel) return;

  console.log("Fetching messages for channel:", currentChannel.name);
  const res = await authFetch(`/channels/${currentChannel.id}/messages`);
  if (!res.ok) {
    console.error("Failed to fetch messages:", res.data.detail);
    return alert("Error fetching messages: " + res.data.detail);
  }

  messagesUl.innerHTML = "";
  res.data.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = `${msg.username}: ${msg.content}`;
    messagesUl.appendChild(li);
  });
  messagesUl.scrollTop = messagesUl.scrollHeight;
}

// -------------------
// Send Message
// -------------------
document.getElementById("send-message").addEventListener("click", async () => {
  const content = document.getElementById("message-input").value.trim();
  if (!currentChannel || !content) return;

  console.log("Sending message:", content);
  const res = await authFetch(`/channels/${currentChannel.id}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  if (res.ok) {
    document.getElementById("message-input").value = "";
    fetchMessages();
  } else {
    console.error("Failed to send message:", res.data.detail);
    alert("Error sending message: " + res.data.detail);
  }
});

// -------------------
// Create Tavern
// -------------------
document.getElementById("create-tavern").addEventListener("click", async () => {
  const name = document.getElementById("new-tavern-name").value.trim();
  if (!name) return;

  console.log("Creating new tavern:", name);
  const res = await authFetch("/taverns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  if (res.ok) {
    document.getElementById("new-tavern-name").value = "";
    fetchTaverns();
  } else {
    console.error("Failed to create tavern:", res.data.detail);
    alert("Error creating tavern: " + res.data.detail);
  }
});

// -------------------
// Logout
// -------------------
document.getElementById("logout-button").addEventListener("click", () => {
  console.log("Logging out...");
  localStorage.removeItem("tavern_jwt");
  window.location.href = "login.html";
});

// -------------------
// Initial Fetch
// -------------------
fetchTaverns();
