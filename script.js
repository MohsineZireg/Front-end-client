// Function to request a new client ID from the server
function getNewClientId() {
  fetch('https://back-end-server-azc1.onrender.com/clientId/new', {
    method: 'GET',
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.code === 1) {
        // Store the client ID in localStorage for future use
        localStorage.setItem('clientId', data.clientId);
        // Start fetching messages after receiving the client ID
        updateMessageList();
      } else {
        alert("Error getting client ID.");
      }
    })
    .catch(function(error) {
      console.error('Error getting client ID:', error);
    });
}

// Function to send a message to the micro-service
function sendMessage() {
  var newMessage = document.getElementById("new-message").value;
  var clientId = localStorage.getItem('clientId');

  fetch('https://back-end-server-azc1.onrender.com/msg/post/' + newMessage + '/' + clientId, {
    method: 'GET',
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.code === 1) {
        updateMessageList();
        document.getElementById("new-message").value = "";
      } else {
        alert("Error adding the message.");
      }
    })
    .catch(function(error) {
      console.error('Error sending message:', error);
    });
}

// Function to update the message list on the page
function updateMessageList() {
  // Mapping of clientId to colors
  const colorMap = [
    "#007bff", // Blue
    "#28a745", // Green
    "#dc3545", // Red
    "#ffc107", // Yellow
    "#6610f2", // Purple
    "#17a2b8", // Cyan
    "#fd7e14", // Orange
    "#6f42c1", // Indigo
    "#e83e8c", // Pink
    "#20c997", // Teal
  ];

  fetch('https://back-end-server-azc1.onrender.com/msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      if (messages.length > 0) {
        var messageList = document.getElementById("message-list");
        messageList.innerHTML = "";

        messages.forEach(function(message) {
          var messageContainer = document.createElement("div");
          var messageContent = document.createElement("div");
          messageContainer.classList.add("flex", "w-full", "mt-2", "space-x-3", "max-w-xs");

          // Check if the message's client ID matches the current client ID
          if (message.clientId.toString() === localStorage.getItem('clientId')) {
            messageContainer.classList.add("ml-auto", "justify-end"); // Apply styling for current client ID
            messageContent.classList.add("bg-blue-600", "text-white", "p-3", "rounded-l-lg", "rounded-br-lg");
          }
          else {
            messageContent.classList.add("bg-gray-300", "p-3", "rounded-r-lg", "rounded-bl-lg");
          }
          
          var avatar = document.createElement("div");
          avatar.classList.add("flex-shrink-0", "h-10", "w-10", "rounded-full");
          avatar.style.backgroundColor = colorMap[message.clientId % colorMap.length];

          var messageText = document.createElement("p");
          messageText.classList.add("text-sm");
          messageText.textContent = message.message;

          messageContent.appendChild(messageText);

          if (message.clientId.toString() === localStorage.getItem('clientId')) {
            messageContainer.appendChild(messageContent);
            messageList.appendChild(messageContainer);
            messageContainer.appendChild(avatar);
          }
          else {
            messageContainer.appendChild(avatar);
            messageContainer.appendChild(messageContent);
            messageList.appendChild(messageContainer);
          }

          document.getElementById("new-message").value = "";
          
        });
      } else {
        alert("No messages available");
      }
    });
}




// Fetch new client ID when the page loads
document.addEventListener("DOMContentLoaded", function() {
  getNewClientId();
});

document.getElementById("message-form").addEventListener("submit", function(event) {
  event.preventDefault();
  sendMessage();
});
