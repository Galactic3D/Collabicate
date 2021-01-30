const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function loadGroup() {
  var id = urlParams.get("id");

  if(id) {
    db.collection("groups").doc(id).get().then((docSnapshot) => {
      if(docSnapshot.exists) {
        var data = docSnapshot.data();

        var name = data.name;

        document.title = "Collabicate - " + name;
        document.getElementById("collabLabel").innerText = "Collab: " + name;
        document.getElementById("collabIDLabel").innerText = "#" + id;
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
