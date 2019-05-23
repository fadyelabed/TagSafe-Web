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
            uid = user.uid;

            getUserTags(uid);
            getUserStories(uid);
            getUserFiles(uid);

        } else {
            console.log("no success");

        }


    });

    function getUserTags(uid) {

        // Create a reference to the cities collection
        var userRef = db.collection("user-tags");

        // Create a query against the collection.
        var query = userRef.where("userUid", "==", uid);
        //console.log(query);

        query.limit(8).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();

                section.append('<a href="#"><p>' + data["name"] + " " + '</p></a>')
            });
        });

    }

    //Gets user stories
    function getUserStories(uid) {
        console.log("inside");
        var storiesRef = db.collection("user-stories");

        var query = storiesRef.where("userUid", "==", uid);

        query.limit(3).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();

                var files = data["files"];
                var thumb = data["thumbnail"];
                console.log(data["title"]);
                console.log(files);
                
                $(".stories").append('<a href="#"><div class="story-item">.<article><h2>' + data["title"] + "</h2><p>" + data["dateCreated"] + '</p></article></div></a>');
                $(".story-item").css("background-image", "url('" + data["thumbnail"] + "')");
                console.log(thumb);
                
                
                for (var i = 0; i < files.length; i++) {
                    var storyFileId = files[i];
                                        
                    //Gets files of user stories
                    getStoryFileById(storyFileId);

                }
            });
        });

    }

    function getStoryFileById(id) {
        var storyFileRef = db.collection("user-files").doc(id);

        storyFileRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


    function getUserFiles(uid) {

        // Create a reference to the cities collection
        var userRef = db.collection("user-files");

        // Create a query against the collection.
        var query = userRef.where("userUid", "==", uid);
        //console.log(query);

        query.limit(5).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                var mediaURL = data["mediaURL"];
                var filename = data["filename"];
                var resolution = data["resolution"];
                var dataCreated = data["dataCreated"];
                //console.log(mediaURL);
                //var $row = $('<tr></tr>').appendTo('.file-item');

                $(".recentFiles").append($('<div class="file-item">' + `<article><img src="${mediaURL} "/>` + '<footer><h2>' + filename + '</h2><b><p>' + resolution + '</p></b><p>' + dataCreated + '</p></article></div>').attr('src', mediaURL));

                //           $(".file-item article").append($('<img />').attr('src', mediaURL));

                //console.log(doc.id, ' => ', doc.data());
            });
        });

    }

    db.collection("tags").orderBy("name").limit(8).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            //console.log(data["name"]);

            //            section.append('<a href="#"><p>' + data["name"] + " " + '</p></a>')
        });
    });
});

//Logout methode
function logout() {
    firebase.auth().signOut();
    //console.log(logout);
    window.location.href = "../index.html";

};
