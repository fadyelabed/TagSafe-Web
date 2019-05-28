window.addEventListener("load", function () {
        var editor = theWYSIWYG.document;
        editor.designMode = "on";

        boldButton.addEventListener("click", function () {
            editor.execCommand("Bold", false, null);
        }, false);

        italicButton.addEventListener("click", function () {
            editor.execCommand("Italic", false, null);
        }, false);

        supButton.addEventListener("click", function () {
            editor.execCommand("Superscript", false, null);
        }, false);

        subButton.addEventListener("click", function () {
            editor.execCommand("Subscript", false, null);
        }, false);

        strikeButton.addEventListener("click", function () {
            editor.execCommand("Strikethrough", false, null);
        }, false);

        orderedListButton.addEventListener("click", function () {
            editor.execCommand("InsertOrderedList", false, "newOL" + Math.round(Math.random() * 1000));
        }, false);

        uborderedListButton.addEventListener("click", function () {
            editor.execCommand("InsertUnorderedList", false, "newOL" + Math.round(Math.random() * 1000));
        }, false);

        fontColorButton.addEventListener("change", function (event) {
            editor.execCommand("ForeColor", false, event.target.value);
        }, false);

        highlightButton.addEventListener("change", function (event) {
            editor.execCommand("BackColor", false, event.target.value);
        }, false);

        fontChanger.addEventListener("change", function (event) {
            editor.execCommand("FontName", false, event.target.value);

        }, false);

        fontSizeChanger.addEventListener("change", function (event) {
            editor.execCommand("FontSize", false, event.target.value);

        }, false);

        linkButton.addEventListener("click", function () {
            var url = prompt("Enter a URL", "http://");
            editor.execCommand("CreateLink", false, url);
        }, false);

        unLinkButton.addEventListener("click", function () {
            editor.execCommand("UnLink", false, null);
        }, false);

        undoButton.addEventListener("click", function () {
            editor.execCommand("undo", false, null);
        }, false);

        redoButton.addEventListener("click", function () {
            editor.execCommand("redo", false, null);
        }, false);

    }, false);

    var fonts = document.querySelectorAll("select#fontChanger > option");
    for (var i = 0; i < fonts.length; i++) {
        fonts[i].style.fontFamily = fonts[i].value;
    }
    
    function printpage() {
        alert("test");
        //Get the print button and put it into a variable
//        var nav = document.getElementById("nav-collapsed");
//        var save = document.getElementById("save");
         
        //Set the print button visibility to 'hidden'
//        save.style.visibility = 'hidden';
//        nav.style.visibility = 'hidden';
        //Print the page content
                $(".nav-collapsed").hide();
        $(".fileViewer").hide();
        $(".texteditorSplit").css("width", "100%");
        $(".texteditorSplit input").css({"box-sizing": "border-box", "font-size": "2.5em"});
        $(".subtitle").css("font-size", "2.1em");
        $(".texteditorSplit textarea").css("font-size", "1.6em");

        $(".texteditorSplit figure").css("overflow", "initial");
        $(".export").hide();
        
        window.print();

        

        //Set the print button to 'visible' again
        //[Delete this line if you want it to stay hidden after printing]
//       save.style.visibility = 'visible';
//        nav+.style.visibility = 'visible';
    }