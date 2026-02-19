document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const appContainer = document.getElementById("app");
  const sidebar = document.getElementById("sidebar");
  const channelsDiv = document.getElementById("channels");
  const messagesDiv = document.getElementById("messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  let selectedServer = null;
  let selectedChannel = null;
  let ws = null;

  // --- LOGIN ---
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/auth/login", {
      method: "POST",
      body: new URLSearchParams({ username, password }),
      credentials: "include"
    });

    if (res.ok) {
      loginContainer.style.display = "none";
      appContainer.style.display = "flex";
      loadServers();
    } else {
      alert("Login failed");
    }
  });

  // --- LOGOUT ---
  document.getElementById("logout-btn").addEventListener("click", async () => {
    await fetch("/auth/logout", { method: "POST", credentials: "include" });
    location.reload();
  });

  // --- LOAD SERVERS ---
  async function loadServers() {
    const res = await fetch("/servers/", { credentials: "include" });
    if (!res.ok) return console.error("Failed to load servers", res.status);

    const servers = await res.json();
    sidebar.innerHTML = `<h3>Servers</h3>`;
    servers.forEach(server => {
      const btn = document.createElement("button");
      btn.textContent = server.name;
      btn.addEventListener("click", () => loadChannels(server));
      sidebar.appendChild(btn);
    });

    const createServerBtn = document.createElement("button");
    createServerBtn.textContent = "+ Create Server";
    createServerBtn.addEventListener("click", createServerPrompt);
    sidebar.appendChild(createServerBtn);
  }

  async function createServerPrompt() {
    const name = prompt("Enter server name:");
    if (!name) return;
    const res = await fetch("/servers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name })
    });
    if (res.ok) loadServers();
    else alert("Failed to create server");
  }

  // --- LOAD CHANNELS ---
  async function loadChannels(server) {
    selectedServer = server;
    const res = await fetch(`/channels/server/${server.public_id}`, { credentials: "include" });
    if (!res.ok) return console.error("Failed to load channels", res.status);

    const channels = await res.json();
    channelsDiv.innerHTML = `<h3>Channels</h3>`;
    channels.forEach(channel => {
      const btn = document.createElement("button");
      btn.textContent = channel.name;
      btn.addEventListener("click", () => loadMessages(channel));
      channelsDiv.appendChild(btn);
    });

    const createChannelBtn = document.createElement("button");
    createChannelBtn.textContent = "+ Create Channel";
    createChannelBtn.addEventListener("click", createChannelPrompt);
    channelsDiv.appendChild(createChannelBtn);
  }

  async function createChannelPrompt() {
    if (!selectedServer) return alert("Select a server first");
    const name = prompt("Enter channel name:");
    if (!name) return;
    const res = await fetch(`/channels/server/${selectedServer.public_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name })
    });
    if (res.ok) loadChannels(selectedServer);
    else alert("Failed to create channel");
  }

  // --- LOAD MESSAGES & CONNECT WEBSOCKET ---
  async function loadMessages(channel) {
    selectedChannel = channel;

    // Close previous WebSocket if any
    if (ws) ws.close();

    // Load last 50 messages initially
    const res = await fetch(`/messages/${channel.public_id}?limit=50`, { credentials: "include" });
    if (!res.ok) return console.error("Failed to load messages", res.status);
    const messages = await res.json();
    messagesDiv.innerHTML = "";
    messages.forEach(msg => {
      const div = document.createElement("div");
      div.textContent = `${msg.username}: ${msg.content}`;
      messagesDiv.appendChild(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // --- WEBSOCKET ---
    const loc = window.location;
    const protocol = loc.protocol === "https:" ? "wss" : "ws";
    ws = new WebSocket(`${protocol}://${loc.host}/ws/messages/${channel.public_id}`);

    ws.onopen = () => console.log("WebSocket connected to channel", channel.name);

    ws.onmessage = event => {
      const msg = JSON.parse(event.data);
      const div = document.createElement("div");
      div.textContent = `${msg.username}: ${msg.content}`;
      messagesDiv.appendChild(div);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    ws.onclose = () => console.log("WebSocket closed");
    ws.onerror = err => console.error("WebSocket error:", err);
  }

  // --- SEND MESSAGE ---
  function sendMessage() {
    if (!selectedChannel) return alert("Select a channel first");
    const content = messageInput.value.trim();
    if (!content) return;

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ content }));
      messageInput.value = "";
    } else {
      alert("WebSocket not connected");
    }
  }

  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});

let channelsSocket;

function connectChannelsSocket(server) {
  if (channelsSocket) channelsSocket.close();

  channelsSocket = new WebSocket(`ws://${window.location.host}/ws/channels/${server.public_id}`);

  channelsSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "new_channel") {
      const channel = data.channel;
      const btn = document.createElement("button");
      btn.textContent = channel.name;
      btn.addEventListener("click", () => loadMessages(channel));
      channelsDiv.appendChild(btn);
    }
  };
}
