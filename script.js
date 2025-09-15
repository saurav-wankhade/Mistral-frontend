async function sendMessage() {
    const msgInput = document.getElementById('message');
    const chatBox = document.getElementById('chat');
    const userMsg = msgInput.value.trim();
    if (!userMsg) return;
    msgInput.value = '';
  
    // Add user's message
    chatBox.innerHTML += `
      <div class="msg user"><div class="bubble">${userMsg}</div></div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('msg', 'bot');
    typingIndicator.innerHTML = `
      <div class="bubble">
        <div class="typing">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    `;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Fetch bot reply
    const res = await fetch("https://mistral-backend-x036.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg })
    });
    const data = await res.json();
  
    // Remove typing indicator
    typingIndicator.remove();
  
    // Show bot reply
    chatBox.innerHTML += `
      <div class="msg bot"><div class="bubble">${data.reply}</div></div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }


  function checkEnter(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
function clearChat() {
  const chatBox = document.getElementById('chat');
  chatBox.innerHTML = ''; // Clear messages

  // Optional: clear the input box too
  const msgInput = document.getElementById('message');
  msgInput.value = '';
}

