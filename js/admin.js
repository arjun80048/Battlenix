import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

function generateMatchNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `BNX-${year}-${random}`;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  // 🔐 ADMIN CHECK
  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists() || snap.data().role !== "admin") {
    alert("Access denied. Admin only.");
    location.href = "dashboard.html";
    return;
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
    matchNumber,
    game,
    status: "waiting",
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    matchManagerId: null,
    playerListLocked: false
  });

  document.getElementById("result").innerText =
    `Match Created: ${matchNumber}`;
};
