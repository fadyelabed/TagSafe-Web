console.log("Js loaded!");

//Firebase authentication
//Consulted on 20 May 2019
//https://firebase.google.com/docs/auth
function login() {
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;
    //console.log(userEmail + " " + userPassword);
    //  window.alert(userEmail + " " + userPassword);

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        if(error){
            $("#errorLogin").css("display", "block").fadeIn(500);
        }
    });

    //Login methode
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("successfully logged in");
            window.location.href = "pages/home.html";
            console.log(user);

        } else {
            console.log("no success");
        }
    });



};
