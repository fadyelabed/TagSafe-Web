// tags tonen in de homepagina
$(function () {
    var db = firebase.firestore();

    var section = $(".tags")
    var tagsRef = db.collection("tags");
    var tagsArray = [];
    var filteredTags = [];
    var userFiles = [];
    var uid;

    // Searchbar 
    $(".searchbar").submit(function (e) {
        e.preventDefault();
        //console.log("test");

        var searchText = document.getElementById("searchText");
        console.log(searchText.value);

        if (searchText.value == "") {
            console.log("leeg");
            $(".tags").css("display", "initial");
            $(".searchedTags").empty();
        } else {
            var foundTag;
            for (var i = 0; i < tagsArray.length; i++) {
                if (tagsArray[i]["name"].includes(searchText.value)) {
                    foundTag = tagsArray[i];
                    //console.log(foundTag);
                    //console.log("search succes");
                    filteredTags.push(foundTag);
                    $(".tags").css("display", "none");

                    $(".searchedTags").append('<a class="tag-item" name="' + foundTag["name"] + ' " href="#"><p>' + foundTag["name"] + " " + '</p></a>');

                }
            }
            $(".tag-item").on("click", function (e) {
                console.log($(this).attr('name'));
                searchText.value = $(this).attr('name');
            });

            searchForFiles(searchText.value);
        }


    });

    // Bij elke login van een ander user verandert de data naar zijn id.
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



    //search functie op homepagina
    function searchForFiles(searchText) {
        var matchingTags = [];
        var tagsRef = db.collection("user-tags");

        var query = tagsRef.where("userUid", "==", uid);

        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                //console.log(data);

                if(data["name"].includes(searchText)){
                    matchingTags.push(doc.id);
                }
            });

            //console.log(matchingTags);
            for(var i=0; i<userFiles.length;i++){
                var userFileTags = [];
                userFileTags = userFiles[i]["tags"];
                //
                // if(matchingTags.intersect userFileTags){
                //     console.log("match");
                // }
                // var is_same = (matchingTags.length == userFileTags.length) && matchingTags.every(function(element, index) {
                //     console.log(element === userFileTags[index]);
                // });
            }
        });
    }

    function getUserTags(uid) {

        // Create a reference to the cities collection
        var userRef = db.collection("user-tags");

        // Create a query against the collection.
        var query = userRef.where("userUid", "==", uid);
        //console.log(query);

        query.limit(8).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                tagsArray.push(data);

                section.append('<a href="#" class="tag-item"><p>' + data["name"] + " " + '</p></a>')
            });
            console.log(tagsArray)

            for (var i = 0; i < tagsArray.length; i++) {
                console.log(tagsArray[i]["name"]);
            }


            $(".tag-item").on("click", function () {
                //console.log("test");
                console.log(filteredTags[i]);

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
                //console.log(data["title"]);
                //console.log(files);

                $(".stories").append('<a href="#"><div class="story-item">.<article><h2>' + data["title"] + "</h2><p>" + data["dateCreated"] + '</p></article></div></a>');
                $(".story-item").css("background-image", "url('" + data["thumbnail"] + "')");
                //console.log(thumb);


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
                //console.log("Document data:", doc.data());
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
                var content = data["content"];
                var filename = data["filename"];
                var detail = data["detail"];
                var dataCreated = data["dataCreated"];
                //console.log(content);

                userFiles.push(data);

                $(".recentFiles").append($('<div class="file-item">' + `<article><img src="${content} "/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dataCreated + '</p></article></div>').attr('src', content));

            });
        });
    }

    db.collection("tags").orderBy("name").limit(8).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            var data = doc.data()
            //console.log(data["name"]);
        });
    });




});

//Logout methode
function logout() {
    firebase.auth().signOut();
    //console.log(logout);
    window.location.href = "../index.html";

};
