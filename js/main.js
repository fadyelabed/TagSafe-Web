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

$(function () {
    $(".logonav").mouseenter(function () {
        $(this).attr('src', "../images/mouseenter.gif");
    }).finish().mouseleave(function () {
        $(this).attr('src', "../images/mouseleave.gif");
    })
});
