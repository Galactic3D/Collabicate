const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let id;
let guide;

function loadGuide() {
  id = urlParams.get("id");
  guide = urlParams.get("guide");

  if (guide && id) {
    db.collection("groups").doc(id).collection("guides").doc(guide).get().then((doc) => {
      var data = doc.data();

      document.getElementById("guide-label").innerText = "Guide - " + data.title;

      if (data.realContent) {
        document.getElementById("guideContentInput").value = data.realContent;
      }
    });
  } else {
    window.location.href = "index.html";
  }
}

function processEdit(event) {
  event.preventDefault();

  db.collection("groups").doc(id).collection("guides").doc(guide).update({
    realContent: document.getElementById("guideContentInput").value
  }).then((doc) => {
    window.alert("Successfully saved changes!");
  });
}

function goBack() {
  window.location.href = "collab.html?id=" + id;
}
