import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.register = async () => {
  const name = nameInput.value;
  const ign = ignInput.value;
  const uid = uidInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const user = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", user.user.uid), {
    name, gameIGN: ign, gameUID: uid, role: "player"
  });

  location.href = "dashboard.html";
};

window.login = async () => {
  await signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
  location.href = "dashboard.html";
};

window.logout = async () => {
  await signOut(auth);
  location.href = "index.html";
};
