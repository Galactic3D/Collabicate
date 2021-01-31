const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let discussionPage;
let filesPage;
let tasksPage;
let guidesPage;
let quizesPage;
let membersPage;

let groupId;

function loadGroup() {
  var id = urlParams.get("id");

  groupId = id;

  if (id) {
    db.collection("groups").doc(id).get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        var data = docSnapshot.data();

        var name = data.name;

        document.title = "Collabicate - " + name;
        document.getElementById("collabLabel").innerText = "Collab: " + name;
        document.getElementById("inviteCollabCode").innerText = "Collab Code: " + id;

        for (member of data.members) {
          db.collection("users").doc(member).get().then((memberDoc) => {
            if (memberDoc.exists) {
              var memberData = memberDoc.data();

              var memberName = memberData.name;
              var memberEmail = memberData.email;

              if (!memberName) {
                if (memberEmail) {
                  memberName = memberEmail;
                } else {
                  memberName = memberDoc.id;
                }
              }

              if (!memberEmail) {
                memberEmail = "";
              }
            } else {
              var memberName = memberDoc.id;
              var memberEmail = "";
            }

            var tbodyRef = document.getElementById('membersTable').getElementsByTagName('tbody')[0];

            var memberRow = tbodyRef.insertRow();

            var nameCell = memberRow.insertCell();
            var emailCell = memberRow.insertCell();

            var nameText = document.createTextNode(memberName);
            nameCell.appendChild(nameText);

            var emailText = document.createTextNode(memberEmail);
            emailCell.appendChild(emailText);
          });
        }
      } else {
        window.location.href = "index.html";
      }
    }).catch(function(error) {
      console.log("Failed to get project: ", error);
    });
  } else {
    window.location.href = "index.html";
  }
}

function loadPages() {
  discussionPage = document.getElementById('discussion');
  filesPage = document.getElementById('files');
  tasksPage = document.getElementById('tasks');
  guidesPage = document.getElementById('guides');
  quizesPage = document.getElementById('quizes');
  membersPage = document.getElementById('members');
}

function openDiscussion() {
  discussionPage.style.display = "block";
  filesPage.style.display = "none";
  tasksPage.style.display = "none";
  guidesPage.style.display = "none";
  quizesPage.style.display = "none";
  membersPage.style.display = "none";
}

function openFiles() {
  discussionPage.style.display = "none";
  filesPage.style.display = "block";
  tasksPage.style.display = "none";
  guidesPage.style.display = "none";
  quizesPage.style.display = "none";
  membersPage.style.display = "none";
}

function openTasks() {
  discussionPage.style.display = "none";
  filesPage.style.display = "none";
  tasksPage.style.display = "block";
  guidesPage.style.display = "none";
  quizesPage.style.display = "none";
  membersPage.style.display = "none";
}

function openGuides() {
  discussionPage.style.display = "none";
  filesPage.style.display = "none";
  tasksPage.style.display = "none";
  guidesPage.style.display = "block";
  quizesPage.style.display = "none";
  membersPage.style.display = "none";
}

function openQuizes() {
  discussionPage.style.display = "none";
  filesPage.style.display = "none";
  tasksPage.style.display = "none";
  guidesPage.style.display = "none";
  quizesPage.style.display = "block";
  membersPage.style.display = "none";
}

function openMembers() {
  discussionPage.style.display = "none";
  filesPage.style.display = "none";
  tasksPage.style.display = "none";
  guidesPage.style.display = "none";
  quizesPage.style.display = "none";
  membersPage.style.display = "block";
}

function processNewMessage() {
  var chatInputElement = document.getElementById('chatBoxInput');
  var message = chatInputElement.value;

  if (message) {
    db.collection("groups").doc(groupId).get().then((docSnapshot) => {
      if (docSnapshot.exists) {

        db.collection("users").doc(firebase.auth().currentUser.uid).get().then((tempDoc) => {
          var commentAuthor = "";

          if (tempDoc.exists) {
            var data = tempDoc.data();

            var name = data.name;
            if (name) {
              commentAuthor = name;
            } else {
              commentAuthor = firebase.auth().currentUser.uid;
            }
          } else {
            commentAuthor = firebase.auth().currentUser.uid;
          }

          db.collection("groups").doc(groupId).update({
            messages: firebase.firestore.FieldValue.arrayUnion(commentAuthor + "--messageseperator--2323232212--" + message)
          });
        });
      }
    });
  }

  chatInputElement.value = "";
}

function messageListener() {
  db.collection("groups").doc(groupId).onSnapshot(function(doc) {
    var currentUser = firebase.auth().currentUser;

    let oldMessageBox = document.getElementById('messageBox');

    let newMessageBox = document.createElement('div');
    newMessageBox.className = "message-box overflow-auto";
    newMessageBox.id = "messageBox";

    var data = doc.data();

    for (message of data.messages) {
      var messageSplit = message.split("--messageseperator--2323232212--");

      let messageCard = document.createElement('div');
      messageCard.className = "card";
      messageCard.style.width = "40rem";
      messageCard.style.marginRight = "100%"
      messageCard.style.marginTop = "10px";
      messageCard.style.marginBottom = "10px;"

      if (messageSplit[0] == currentUser.uid) {
        messageCard.style.float = "left";
      } else {
        messageCard.style.float = "left";
      }

      let messageCardBody = document.createElement('div');
      messageCardBody.className = 'card-body';

      var commentAuthor = messageSplit[0];

      let title = document.createElement('h6');
      title.className = "card-title";
      title.style.fontSize = "15px";
      title.innerText = commentAuthor;

      let text = document.createElement('p');
      text.innerText = messageSplit[1];
      text.style.color = "black";
      text.className = "card-text";

      messageCardBody.appendChild(title);
      messageCardBody.appendChild(text);
      messageCard.appendChild(messageCardBody);
      newMessageBox.appendChild(messageCard);
    }

    oldMessageBox.parentNode.replaceChild(newMessageBox, oldMessageBox);

    newMessageBox.scrollBy(0, 100000);
  });
}

function loadTasks() {
  db.collection("groups").doc(groupId).get().then((snapshot) => {
    if (snapshot.exists) {
      var data = snapshot.data();

      var tasks = data.tasks;

      for (task of tasks) {
        var taskData = task.split("--sdfsdf--fdf-sds--");

        let card = document.createElement('div');
        card.className = "card";
        card.style.width = "30rem";
        card.style.height = "13rem";
        card.style.marginTop = "30px";
        card.style.marginBottom = "30px;"

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let title = document.createElement('h5');
        title.className = "card-title";
        title.style.fontSize = "18px";
        title.innerText = taskData[0];

        let text = document.createElement('p');
        text.innerText = taskData[1];
        text.style.color = "black";
        text.className = "card-text";

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        card.appendChild(cardBody);
        document.getElementById("tasks-container").appendChild(card);
      }
    }
  });
}

function processNewTask(event) {
  event.preventDefault();

  var taskName = document.getElementById("taskNameInput");
  var taskDescription = document.getElementById("taskDescriptionInput");


  db.collection("groups").doc(groupId).update({
    tasks: firebase.firestore.FieldValue.arrayUnion(taskName.value + "--sdfsdf--fdf-sds--" + taskDescription.value)
  });

  let card = document.createElement('div');
  card.className = "card";
  card.style.width = "30rem";
  card.style.height = "13rem";
  card.style.marginTop = "30px";
  card.style.marginBottom = "30px;"

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let title = document.createElement('h5');
  title.className = "card-title";
  title.style.fontSize = "18px";
  title.innerText = taskName.value;

  let text = document.createElement('p');
  text.innerText = taskDescription.value;
  text.style.color = "black";
  text.className = "card-text";

  cardBody.appendChild(title);
  cardBody.appendChild(text);
  card.appendChild(cardBody);
  document.getElementById("tasks-container").appendChild(card);

  taskName.value = "";
  taskDescription.value = "";
}

function processNewGuide(event) {
  event.preventDefault();

  var guideName = document.getElementById("guideNameInput");
  var guideDescription = document.getElementById("guideDescriptionInput");

  db.collection("users").doc(firebase.auth().currentUser.uid).get().then((doc) => {
    if (doc.exists) {
      var data = doc.data();

      var userName = data.name;

      if (userName) {
        db.collection("groups").doc(groupId).collection("guides").add({
          author: userName,
          title: guideName.value,
          content: guideDescription.value,
          realContent: " "
        }).then(function(guideDoc) {
          window.location.href = "guide.html?id=" + groupId + "&guide=" + guideDoc.id;
        });
      } else {
        db.collection("groups").doc(groupId).collection("guides").add({
          author: firebase.auth().currentUser.email,
          title: guideName.value,
          content: guideDescription.value,
          realContent: " "
        }).then(function(guideDoc) {
          window.location.href = "guide.html?id=" + groupId + "&guide=" + guideDoc.id;
        });
      }
    } else {
      db.collection("groups").doc(groupId).collection("guides").add({
        author: firebase.auth().currentUser.email,
        title: guideName.value,
        content: guideDescription.value,
        realContent: " "
      }).then(function(guideDoc) {
        window.location.href = "guide.html?id=" + groupId + "&guide=" + guideDoc.id;
      });
    }
  });
}

function loadGuides() {
  db.collection("groups").doc(groupId).collection("guides").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var guideData = doc.data();

      addGuide(guideData.title, guideData.content, guideData.author, doc.id);
    });
  });
}

function addGuide(title, content, author, guideID) {
  var tbodyRef = document.getElementById('guidesTable').getElementsByTagName('tbody')[0];

  var memberRow = tbodyRef.insertRow();

  var nameCell = memberRow.insertCell();
  var aboutCell = memberRow.insertCell();
  var authorCell = memberRow.insertCell();
  var actionCell = memberRow.insertCell();

  var nameText = document.createElement('a');
  nameText.innerText = title;
  nameText.href = "guide-view.html?id=" + groupId + "&guide=" + guideID;
  nameCell.appendChild(nameText);

  var aboutText = document.createTextNode(content);
  aboutCell.appendChild(aboutText);

  var authorText = document.createTextNode(author);
  authorCell.appendChild(authorText);

  var editText = document.createElement('a');
  editText.innerText = "edit";
  editText.href = "guide.html?id=" + groupId + "&guide=" + guideID;
  actionCell.appendChild(editText);
}

function processFileUpload(event) {
  event.preventDefault();

console.log(document.getElementById("inputGroupFile04").value);
  firebase.storage().ref().child(groupId + "/").put(document.getElementById("inputGroupFile04").value)
    .then(snapshot => {
      console.log('Uploaded.');
    });
}

function loadFiles() {
  firebase.storage().ref().child(groupId).listAll().then((res) => {
    res.items.forEach((itemRef) => {
      console.log(itemRef);
    });
  });
}
