function registerUser(event) {
  event.preventDefault();

  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;
  var name = document.getElementById('nameInput').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
    console.log("Successfully registered user.");

    db.collection("users").doc(firebase.auth().currentUser.uid).set({
      name: name,
      email: firebase.auth().currentUser.email
    }).then(function() {
      window.location.href = "index.html";
    });
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Failed to register user.");

    window.alert("Failed to create account: " + errorMessage);
  });
}
