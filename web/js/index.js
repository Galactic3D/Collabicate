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

  var projectName = document.getElementById("projectNameInput").value;
  var projectOrganization = document.getElementById("schoolOranizationInput").value;
  var projectDesctiption = document.getElementById("projectDescriptionInput").value;

  var currentUser = firebase.auth().currentUser;

  var projectId = getRndInteger(100000, 999999).toString();

  db.collection("groups").doc(projectId).set({
      name: projectName,
      organization: projectOrganization,
      description: projectDesctiption,
      members: [currentUser.uid]
    })
    .then(function(docRef) {
      console.log("Successfully create project with ID: " + projectId);

      window.location.reload();
    })
    .catch(function(error) {
      console.error("Error creating the new project: ", error);

      window.alert("Failed to create new project: " + error.message);
    });
}

function processJoin(event) {
  event.preventDefault();

  var id = document.getElementById("projectCodeInput").value;
  var currentUser = firebase.auth().currentUser;

  db.collection("groups").doc(id).get().then((docSnapshot) => {
    if(docSnapshot.exists) {
      db.collection("groups").doc(id).update({
          members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
      }).then(function() {
        window.location.reload();
      });
    } else {
      window.alert("Could not find a project with that code.");
    }
  }).catch(function(error) {
      console.log("Failed to get project: ", error);
  });
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cardContainer;

function setProjectCards() {
  var currentUser = firebase.auth().currentUser;

  db.collection("groups").where("members", "array-contains", currentUser.uid).get()
    .then(function(querySnapshot) {
      cardContainer = document.getElementById("card-container");

        querySnapshot.forEach(function(doc) {
            var data = doc.data();
            var name = data.name;
            var organization = data.organization;
            var description = data.description;

            createCard(name, organization, description, doc.id);
        });

        cardContainer.appendChild(document.getElementById("createJoinButton"));
    })
    .catch(function(error) {
        console.log("Failed to get projects: ", error);
    });
}

function createCard(name, organization, description, id) {
    let click = document.createElement('a');
    click.href = "collab.html?id=" + id;

    let card = document.createElement('div');
    card.className = 'card project-card';
    card.style.height = "12rem";
    card.style.width = "18rem";

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = name;
    title.style.decoration = "none";
    title.style.color = "black";
    title.className = 'card-title';

    let subtitle = document.createElement('h6');
    subtitle.innerText = organization;
    subtitle.className = "card-subtitle mb-2 text-muted";

    let text = document.createElement('p');
    text.innerText = description;
    text.style.decoration = "none";
    text.style.color = "black";
    text.className = "card-text";


    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);
    cardBody.appendChild(text);
    card.appendChild(cardBody);
    click.appendChild(card);
    cardContainer.appendChild(click);
}
