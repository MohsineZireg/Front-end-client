const serverURL = 'https://back-end-server-azc1.onrender.com';

function getNewClientId() {
  fetch(`${serverURL}/clientId/new`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 1) {
        localStorage.setItem('clientId', data.clientId);
        updateMessageList();
      } else {
        alert("Error getting client ID.");
      }
    })
    .catch(error => {
      console.error('Error getting client ID:', error);
    });
}

function sendMessage() {
  const newMessage = document.getElementById("new-message").value;
  const clientId = localStorage.getItem('clientId');
  const picture = document.getElementById("new-picture").files[0];
  const formData = new FormData();
  formData.append('message', newMessage);
  formData.append('picture', picture);

  fetch(`${serverURL}/msg/post/${clientId}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.code === 1) {
        updateMessageList();
        document.getElementById("new-message").value = "";
        document.getElementById("new-picture").value = "";
      } else {
        alert("Error adding the message.");
      }
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}

function updateMessageList() {
  const colorMap = [
    "#007bff", "#28a745", "#dc3545", "#ffc107", "#6610f2", 
    "#17a2b8", "#fd7e14", "#6f42c1", "#e83e8c", "#20c997"
  ];

  fetch(`${serverURL}/msg/getAll`)
    .then(response => response.json())
    .then(messages => {
      if (messages.length > 0) {
        const messageList = document.getElementById("message-list");
        messageList.innerHTML = "";

        messages.forEach(message => {
          const messageContainer = document.createElement("div");
          const messageContent = document.createElement("div");
          messageContainer.classList.add("flex", "w-full", "mt-2", "space-x-3", "max-w-xs");

          if (message.clientId.toString() === localStorage.getItem('clientId')) {
            messageContainer.classList.add("ml-auto", "justify-end");
            messageContent.classList.add("bg-blue-600", "text-white", "p-3", "rounded-l-lg", "rounded-br-lg");
          } else {
            messageContent.classList.add("bg-gray-300", "p-3", "rounded-r-lg", "rounded-bl-lg");
          }

          const avatar = document.createElement("div");
          avatar.classList.add("flex-shrink-0", "h-10", "w-10", "rounded-full");
          avatar.style.backgroundColor = colorMap[message.clientId % colorMap.length];

          if (message.picture) {
            const image = document.createElement("img");
            image.src = `${serverURL}/${message.picture}`;
            image.classList.add("max-w-full", "h-auto", "rounded-lg");
            messageContent.appendChild(image);
            console.log("Image URL:", image.src);
          }

          const messageText = document.createElement("p");
          messageText.classList.add("text-sm");
          messageText.textContent = message.message;

          messageContent.appendChild(messageText);

          if (message.clientId.toString() === localStorage.getItem('clientId')) {
            messageContainer.appendChild(messageContent);
            messageList.appendChild(messageContainer);
            messageContainer.appendChild(avatar);
          } else {
            messageContainer.appendChild(avatar);
            messageContainer.appendChild(messageContent);
            messageList.appendChild(messageContainer);
          }
        });
      }
    })
    .catch(error => {
      console.error('Error updating message list:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  getNewClientId();
  setInterval(updateMessageList, 3000);
});

document.getElementById("message-form").addEventListener("submit", function(event) {
  event.preventDefault();
  sendMessage();
});
