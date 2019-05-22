// tags tonen in de homepagina
$(function () {
    var db = firebase.firestore();

    var section = $(".tags")
    var tagsRef = db.collection("tags");
    
    var uid;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("successfully logged in");
            console.log(user.uid);
            uid = user.uid

            db.collection("users").doc(uid).get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        } else {
            console.log("no success");

        }
    });


    db.collection("tags").orderBy("name").limit(8).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            console.log(data["name"]);

            section.append('<a href="#"><p>' + data["name"] + " " + '</p></a>')
        });
    });
});

//Logout methode
function logout(){
    firebase.auth().signOut();
    console.log(logout);
    window.location.href = "../index.html";

};



// tags tonen in de homepagina
//$(function () {
//    var db = firebase.firestore();
//
//    var section = $(".tags")
//    var tagsRef = db.collection("tags");
//
//    //    var tags = tagsRef.orderBy("name").limit(3);
//    //    console.log(tags);
//
//    var uid;
//
//    firebase.auth().onAuthStateChanged(function (user) {
//        if (user) {
//            console.log("successfully logged in");
//            console.log(user.uid);
//            uid = user.uid
//
//            db.collection("users").doc(uid).get().then(function (doc) {
//                if (doc.exists) {
//                    console.log("Document data:", doc.data());
//                } else {
//                    // doc.data() will be undefined in this case
//                    console.log("No such document!");
//                }
//            }).catch(function (error) {
//                console.log("Error getting document:", error);
//            });
//
//        } else {
//            console.log("no success");
//
//        }
//    });
//
