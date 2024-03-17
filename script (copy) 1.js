

// Fonction pour envoyer le message au micro-service
function sendMessage() {
  // Récupérer le texte du textarea
  var newMessage = document.getElementById("new-message").value;

  // Effectuer la requête POST au micro-service pour ajouter le nouveau message
  fetch('https://1395d938-7bb8-4043-a154-2d6df4baa2cb-00-ee9u4555vn44.spock.replit.dev/msg/post/' + newMessage, {
    method: 'GET',
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Vérifier si le message a été ajouté avec succès
      if (data.code === 1) {
        // Mettre à jour la liste des messages sur la page
        updateMessageList();
      } else {
        alert("Erreur lors de l'ajout du message.");
      }
    })
    .catch(function(error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    });
}

// Fonction pour mettre à jour la liste des messages sur la page
function updateMessageList() {
  // Effectuer la requête GET pour récupérer tous les messages
  fetch('https://1395d938-7bb8-4043-a154-2d6df4baa2cb-00-ee9u4555vn44.spock.replit.dev/msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(messages) {
      if (messages.length > 0) {
        // Display the messages in a list on the webpage
        var messageList = document.getElementById("message-list");

        // Clear existing messages
        messageList.innerHTML = "";

        // Loop through the messages and create styled boxes
        messages.forEach(function(message) {
          var messageBox = document.createElement("div");
          messageBox.classList.add("message"); // Add the 'message' class for styling
          messageBox.textContent = message; // Set the message content directly as text content of the box

          messageList.appendChild(messageBox); // Append the message box to the message list container
        });
      } else {
        alert("No messages available");
      }
    });
}
// Capturer l'événement de click sur le bouton "Envoyer"
document.getElementById("message-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêcher le rechargement de la page par défaut du formulaire
  sendMessage(); // Appeler la fonction pour envoyer le message
});

updateMessageList();
