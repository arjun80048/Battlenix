import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function generateMatchNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `BNX-${year}-${random}`;
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "index.html";
  }
});

window.createMatch = async function () {
  const game = document.getElementById("game").value;

  if (!game) {
    alert("Game name required");
    return;
  }

  const matchNumber = generateMatchNumber();

  await addDoc(collection(db, "matches"), {
    matchNumber: matchNumber,
    game: game,
    status: "waiting",
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    matchManagerId: null,
    playerListLocked: false
  });

  document.getElementById("result").innerText =
    `Match Created: ${matchNumber}`;
};
