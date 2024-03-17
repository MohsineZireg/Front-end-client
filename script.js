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
          var messageBox = document.createElement("div");
          messageBox.classList.add("message");
          messageBox.textContent = message.message;

          // Set background color based on clientId
          messageBox.style.backgroundColor = colorMap[message.clientId % colorMap.length];
         

          messageList.appendChild(messageBox);
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
