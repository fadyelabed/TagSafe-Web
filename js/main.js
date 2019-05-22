console.log("Js loaded!");

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
    
    var db = firebase.firestore();

db.collection("tags").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

};

//Logout methode
function logout(){
    firebase.auth().signOut();
    console.log(logout);
    window.location.href = "../index.html";

};




$(function () {
    $(".logonav").mouseenter(function () {
        $(this).attr('src', "../images/mouseenter.gif");
    }).finish().mouseleave(function () {
        $(this).attr('src', "../images/mouseleave.gif");
    })
});
