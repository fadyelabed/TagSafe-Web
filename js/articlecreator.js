$(function () {


    var db = firebase.firestore();

    var section = $(".tags")
    var tagsRef = db.collection("tags");
    var tagsArray = [];
    var filteredTags = [];
    var userFiles = [];
    var uid;

    var foundFiles = [];
    var selectedTags = [];

    $(".addContent").hide();

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
                if ((tagsArray[i]["name"]).toLowerCase().includes(searchText.value.toLowerCase())) {
                    foundTag = tagsArray[i];
                    //console.log(foundTag);
                    //console.log("search succes");
                    filteredTags.push(foundTag);
                    $(".tags").css("display", "none");

                    $(".searchedTags").append('<a class="tag-item" name="' + foundTag["id"] + '" href="#"><p>' + foundTag["name"] + "  " + '</p></a>');

                }
            }
            $(".tag-item").on("click", function (e) {

                //console.log($(this).attr("name"));
                var selectedTag = $(this).attr("name");

                var state = $(this).data('state');

                state = !state;

                if (state) {
                    // toggle on
                    selectedTags.push(selectedTag);
                    console.log("Selected: " + selectedTag);
                    $(this).find("p").css({"border": "2px solid #0364e8", "box-sizing": "border-box"});

                } else {
                    //toggle off
                    //Remove specific item from array
                    //http://www.jquerybyexample.net/2012/02/remove-item-from-array-using-jquery.html
                    selectedTags.splice($.inArray(selectedTag, selectedTags),1);
                    console.log("Unselected: " + selectedTag);
                    $(this).find("p").css("border", "0px");

                }
                $(this).data('state', state);
                searchForFiles(selectedTags);
                console.log(selectedTags);



                console.log($(this).attr('name'));
                //searchText.value = $(this).attr('name');
                searchForFiles(selectedTags);
            });


        }
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("successfully logged in");
            console.log(user.uid);
            uid = user.uid;

            getUserTags(uid);
            getUserStories(uid);
            //            getUserFiles(uid);
            getUserartikels(uid);

        } else {
            console.log("no success");

        }

    });

    //http://jsfiddle.net/Vitzkrieg/SdkRZ/
    function compareArrays(arr1, arr2) {
        return $(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0
    }

    //search functie op homepagina
    function searchForFiles(selectedTags) {
        foundFiles = [];
        $(".recentFiles .file-items-wrapper").empty();
        if(selectedTags.length === 0){
            console.log("array empty");
            userFiles = [];
            getUserartikels(uid);
        } else {
            for(var i=0; i<userFiles.length;i++){
                var userFileTags = [];
                userFileTags = userFiles[i]["tags"];
                //console.log(userFileTags);

                //console.log("Comparing " + selectedTags + " AND " + userFileTags);

                if(compareArrays(userFileTags, selectedTags)){
                    foundFiles.push(userFiles[i]);
                    console.log("Found file: " + userFiles[i]["filename"]);
                }

                // if(selectedTags.some(r=> userFileTags.includes(r))){
                //     if(compareArrays(userFileTags, selectedTags)){
                //         foundFiles.push(userFiles[i]);
                //         console.log("Found file: " + userFiles[i]["filename"]);
                //     }
                //     // foundFiles.push(userFiles[i]);
                //     // console.log("Found file: " + userFiles[i]["filename"]);
                // }
            }
            appendFoundFiles(foundFiles);
        }

    }

    function appendFoundFiles(foundFiles){
        for(var i=0;i<foundFiles.length;i++){
            var content = foundFiles[i]["content"];
            var filename = foundFiles[i]["filename"];
            var filetype = foundFiles[i]["filetype"];
            var detail = foundFiles[i]["detail"];
            var dateCreated = foundFiles[i]["dateCreated"];

            if(filetype === "image"){
                $(".recentFiles .file-items-wrapper").append($('<div class="file-item">' + `<article><img src="${content} "/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
            } else if(filetype === "audio"){
                $(".recentFiles .file-items-wrapper").append($('<div class="file-item">' + `<article><img style="height: 60px" src="../images/mic.svg"/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
            } else if(filetype === "video"){
                $(".recentFiles .file-items-wrapper").append($('<div class="file-item">' + `<article><img style="height: 60px" src="../images/video.svg"/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
            } else if(filetype === "note"){
                $(".recentFiles .file-items-wrapper").append($('<div class="file-item">' + `<article><img style="height: 40px" src="../images/notition.svg"/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
            }

        }
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
                data["id"] = doc.id;
                tagsArray.push(data);

                section.append(`<a href="#" class="tag-item" name="${doc.id}"><p>${data["name"]} </p></a>`)
            });
            console.log(tagsArray)

            for (var i = 0; i < tagsArray.length; i++) {
                console.log(tagsArray[i]["name"]);
            }


            $(".tag-item").on("click", function () {

                //console.log($(this).attr("name"));
                var selectedTag = $(this).attr("name");

                var state = $(this).data('state');

                state = !state;

                if (state) {
                    // toggle on
                    selectedTags.push(selectedTag);
                    console.log("Selected: " + selectedTag);
                    $(this).find("p").css({"border": "2px solid #0364e8", "box-sizing": "border-box"});

                } else {
                    //toggle off
                    //Remove specific item from array
                    //http://www.jquerybyexample.net/2012/02/remove-item-from-array-using-jquery.html
                    selectedTags.splice($.inArray(selectedTag, selectedTags),1);
                    console.log("Unselected: " + selectedTag);
                    $(this).find("p").css("border", "0px");

                }
                $(this).data('state', state);
                searchForFiles(selectedTags);
                console.log(selectedTags);

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




    db.collection("tags").orderBy("name").limit(8).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var data = doc.data()
        });
    });


    //Articlecreator

    function getUserartikels(uid) {

        // Create a reference to the cities collection
        var userRef = db.collection("user-files");

        // Create a query against the collection.
        var query = userRef.where("userUid", "==", uid);
        //console.log(query);

        query.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var data = doc.data();
                var content = data["content"];
                var filename = data["filename"];
                var filetype = data["filetype"];
                var detail = data["detail"];
                var dateCreated = data["dateCreated"];
                //console.log(content);

                userFiles.push(data);

                if(filetype === "image"){
                    $(".recentFiles .file-items-wrapper").append($(`<div class="file-item" id="${doc.id}">`  + `<article><img src="${content} "/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
                } else if(filetype === "audio"){
                    $(".recentFiles .file-items-wrapper").append($(`<div class="file-item" id="${doc.id}">` + `<article><img style="height: 60px" src="../images/mic.svg"/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
                } else if(filetype === "video"){
                    $(".recentFiles .file-items-wrapper").append($(`<div class="file-item" id="${doc.id}">` + `<article><img style="height: 60px" src="../images/video.svg"/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
                } else if(filetype === "note"){
                    $(".recentFiles .file-items-wrapper").append($(`<div class="file-item" id="${doc.id}">` + `<article><img style="height: 40px" src="../images/notition.svg"/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dateCreated + '</p></article></div>').attr('src', content));
                }


                $(document).on('click', `#${doc.id}`, function () {
                    console.log(`id: ${doc.id}`);

                    if ($(this).attr('data-click-state') == 1) {
                        $(this).attr('data-click-state', 0)
                        $(this).css("border", "0px")
                        $(".addContent").fadeOut(200);

                    } else {
                        $(this).attr('data-click-state', 1)
                        $(this).css("border", "2px solid var(--blauw)")
                        $(".addContent").fadeIn(200);

                        appendFileToEditor(doc.id, content, filetype);
                    }

                });
            });
        });

        // query.limit(5).get().then(function (querySnapshot) {
        //
        //     querySnapshot.forEach(function (doc) {
        //         var data = doc.data();
        //         var content = data["content"];
        //         var filename = data["filename"];
        //         var detail = data["detail"];
        //         var dataCreated = data["dataCreated"];
        //         //console.log(content);
        //
        //         $(".fileViewer .recentFiles").append($(`<div class="file-item" id="${doc.id}">` + `<article><img src="${content} "/>` + '<footer><h2>' + filename + '</h2><b><p>' + detail + '</p></b><p>' + dataCreated + '</p></article></div>').attr('src', content));
        //
        //         $(document).on('click', `#${doc.id}`, function () {
        //             console.log(`id: ${doc.id}`);
        //
        //             if ($(this).attr('data-click-state') == 1) {
        //                 $(this).attr('data-click-state', 0)
        //                 $(this).css("border", "0px")
        //                 $(".addContent").fadeOut(200);
        //
        //             } else {
        //                 $(this).attr('data-click-state', 1)
        //                 $(this).css("border", "2px solid var(--blauw)")
        //                 $(".addContent").fadeIn(200);
        //
        //                 appendFileToEditor(doc.id, content);
        //             }
        //
        //         });
        //     });
        // });

    }

    function appendFileToEditor(id, content, filetype) {

        $(".addContent").click(function () {
            $(".addContent").fadeOut(200);

            if ($(`.texteditorSplit figure div .${id}`).length == 0) {

                if(filetype === "image"){
                    $(".texteditorSplit figure").append(`<div class="${id}"><img src="${content} "/></div>`);
                } else if(filetype === "audio"){
                    $(".texteditorSplit figure").append(`<div class="${id}"><audio controls preload="none" style="width:480px;"><source src="${content}" type="audio/mp4" /></audio></div>`);
                } else if(filetype === "video"){
                    $(".texteditorSplit figure").append(`<div class="${id}"><video width="100px" height="100px"><source src="${content}" type="video/mp4"></video></div>`);
                } else if(filetype === "note"){
                    $(".texteditorSplit textarea").val($(".texteditorSplit textarea").val() + "\n" + content);
                }


            } else {
                console.log("already exists");
            }


            removeImagefromEditor(id);

        });
    }

    function removeImagefromEditor(id) {
        $(`.${id}`).click(function () {
            $(this).remove();
            //$(".texteditorSplit figure img").remove();
        });
    }

});

//Logout methode
function logout() {
    firebase.auth().signOut();
    //console.log(logout);
    window.location.href = "../index.html";

};