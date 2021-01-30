function resetJoinCreateModal() {
  var buttonsMenu = document.getElementById("joinCreateButtons");
  var createMenu = document.getElementById("createMenu");
  var joinMenu = document.getElementById("joinMenu");

  buttonsMenu.style.display = "block";
  createMenu.style.display = "none";
  joinMenu.style.display = "none";
}

function showCreateMenu() {
  var buttonsMenu = document.getElementById("joinCreateButtons");
  var createMenu = document.getElementById("createMenu");

  buttonsMenu.style.display = "none";
  createMenu.style.display = "block";
}

function showJoinMenu() {
  var buttonsMenu = document.getElementById("joinCreateButtons");
  var joinMenu = document.getElementById("joinMenu");

  buttonsMenu.style.display = "none";
  joinMenu.style.display = "block";
}

function processNewProject(event) {
  event.preventDefault();

  //var projectName = document.getElementById("projectNameInput").value;
  //var projectOrganization = document.getElementById("schoolOranizationInput").value;
  //var projectDesctiption = document.getElementById("projectDescriptionInput").value;

  //var currentUser = firebase.auth().currentUser;

  //var projectId = getRndInteger(100000, 999999).toString();

  db.collection("users").add({
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function processJoin(event) {
  event.preventDefault();

  window.location.reload();
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
