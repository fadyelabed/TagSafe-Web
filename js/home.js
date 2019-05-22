$(function () {
    var db = firebase.firestore();
    
    var section = $(".tags")

    db.collection("tags").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
       
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            console.log(data["name"]);
            
            section.append('<a href="#"><span>'+ data["name"] + '</span></a>')
        });
    });
});

//Logout methode
function logout(){
    firebase.auth().signOut();
    console.log(logout);
    window.location.href = "../index.html";

    
    // tags tonen in de homepagina
    
//    
//    ref.on("value", function(snapshot) {
//    for (x in snapshot.val()) {
//        var xRef = new Firebase("https://tagsafe-e1bf4.firebaseio.com");
//        xRef.once("value", function(xsnapshot) {
//            var data = xsnapshot.val();
//            var name = data["tags"];
//            console.log(name);
//        });
//    }
//});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    function getTags(){
//        $.ajax({
//           databaseURL: "https://tagsafe-e1bf4.firebaseio.com",
//            methode:'GET',
//            data:{
//                   apiKey: "AIzaSyD3-3yCC41HWr-AJYdXkPDSfxD6QEFii5Y",
//            authDomain: "tagsafe-e1bf4.firebaseapp.com",
////            databaseURL: "https://tagsafe-e1bf4.firebaseio.com",
//            projectId: "tagsafe-e1bf4",
//            storageBucket: "tagsafe-e1bf4.appspot.com",
//            messagingSenderId: "719548532308",
//            appId: "1:719548532308:web:ff7914623e41b34b"
//            }
//            
//        }).done(function (data) {
//		        printTags(data);
//		    }).fail(function (error) {
//		        console.log('Fail');
//		    });
//    };
    
   
    
    
    
    
    
    
    
    
    
    
};
