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
        
        
    // Create a reference to the cities collection
    var userRef = db.collection("user-files");

    // Create a query against the collection.
    var query = userRef.where("userUid", "==", uid);
    console.log(query);
        
    query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
    });
});
        
        //Image tonen
        
         var image = $('<img />', {
                    src:  "https://firebasestorage.googleapis.com/v0/b/tagsafe-e1bf4.appspot.com/o/image%2F3BBA73B8-FEFE-4423-999F-900EDE76CA7C.jpeg?alt=media&token=42aedb72-6d05-43a7-bf34-434a5f9d39a8",
                    width: '100px',
                    height: '100px',
               
                });
        console.log(image);
    
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
function logout() {
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
