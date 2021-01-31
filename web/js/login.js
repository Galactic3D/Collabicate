function verifyLogin(event) {
  event.preventDefault();

  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
    console.log("Successfully signed in with credentials.");

    window.location.href = "index.html";
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Failed to login with credentials.");

    window.alert("Invalid email or password!");
  });
}
