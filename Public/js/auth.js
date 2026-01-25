function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      alert("Welcome " + user.displayName);
      console.log(user.email);
    })
    .catch((error) => {
      alert(error.message);
    });
}
