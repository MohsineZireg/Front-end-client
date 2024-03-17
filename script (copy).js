// Fonction pour calculer la factorielle d'un entier positif n
function fact(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
}

// Utilisation de la fonction fact pour afficher la factorielle de 6 dans la console
console.log("Factorielle de 6:", fact(6));

// Fonction qui applique une fonction f à chaque élément d'un tableau
function applique(f, tab) {
  return tab.map(function(element) {
    return f(element);
  });
}

// Utilisation de la fonction applique pour calculer la factorielle de chaque élément d'un tableau
var tableauFactoriel = applique(fact, [1, 2, 3, 4, 5, 6]);
console.log("Factoriel de chaque élément du tableau:", tableauFactoriel);

// Utilisation de la fonction applique avec une fonction non-nommée
var tableauIncrement = applique(function(n) {
  return n + 1;
}, [1, 2, 3, 4, 5, 6]);
console.log("Chaque élément du tableau incrémenté de 1:", tableauIncrement);


// Définition de la variable msgs
var msgs = [
  { "msg": "Hello World" },
  { "msg": "Blah Blah" },
  { "msg": "I love cheese" }
];

// Fonction pour mettre à jour la liste des messages sur la page
function update(msgs) {
  // Récupération de l'élément <ul> qui contiendra la liste des messages
  var messageList = document.getElementById("message-list");

  // Effacement de la liste des messages actuelle
  messageList.innerHTML = "";

  // Parcours du tableau de messages et création d'un nouvel <li> pour chaque message
  msgs.forEach(function(message) {
    var listItem = document.createElement("li");
    listItem.textContent = message.msg;
    messageList.appendChild(listItem);
  });
}
