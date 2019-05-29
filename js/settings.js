$(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("successfully logged in");
            console.log(user.email);

            $("#userEmail").html(user.email);
        } else {
            console.log("no success");

        }

    });
});