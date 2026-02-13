const token = localStorage.getItem("tavern_jwt");
if (!token) window.location.href = "login.html";

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
  const res = await authFetch("/taverns");
  if (!res.ok) return alert(res.data.detail);
  renderTaverns(res.data);
}

function renderTaverns(taverns) {
  tavernList.innerHTML = "";
  taverns.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.name;
    li.addEventListener("click", () => selectTavern(t));
    tavernList.appendChild(li);
  });
}

// -------------------
// Select Tavern
// -------------------
async function selectTavern(tavern) {
  currentTavern = tavern;
  channelHeader.textContent = `Channels in ${tavern.name}`;
  const res = await authFetch(`/taverns/${tavern.id}/channels`);
  if (!res.ok) return alert(res.data.detail);
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
    li.addEventListener("click", () => selectChannel(c));
    channelList.appendChild(li);
  });
}

// -------------------
// Select Channel
// -------------------
function selectChannel(channel) {
  currentChannel = channel;
  messagesUl.innerHTML = "";
  fetchMessages();
}

// -------------------
// Fetch Messages
// -------------------
async function fetchMessages() {
  if (!currentChannel) return;
  const res = await authFetch(`/channels/${currentChannel.id}/messages`);
  if (!res.ok) return alert(res.data.detail);

  messagesUl.innerHTML = "";
  res.data.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = `${msg.username}: ${msg.content}`;
    messagesUl.appendChild(li);
  });
}

// -------------------
// Send Message
// -------------------
document.getElementById("send-message").addEventListener("click", async () => {
  const content = document.getElementById("message-input").value;
  if (!currentChannel || !content) return;
  const res = await authFetch(`/channels/${currentChannel.id}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) fetchMessages();
  document.getElementById("message-input").value = "";
});

// -------------------
// Create Tavern
// -------------------
document.getElementById("create-tavern").addEventListener("click", async () => {
  const name = document.getElementById("new-tavern-name").value;
  if (!name) return;
  const res = await authFetch("/taverns", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: { "Content-Type": "application/json" }
  });
  if (res.ok) {
    document.getElementById("new-tavern-name").value = "";
    fetchTaverns();
  } else {
    alert(res.data.detail);
  }
});

// -------------------
// Initial fetch
// -------------------
fetchTaverns();
