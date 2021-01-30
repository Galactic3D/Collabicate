function registerUser(event) {
  event.preventDefault();

  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;
  var username = document.getElementById('usernameInput').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
    console.log("Successfully registered user.");

    window.location.href = "index.html";
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Failed to register user.");

    window.alert("Failed to create account: " + errorMessage);
  });
}
