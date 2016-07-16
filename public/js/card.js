function getSelectedText() {
    var text = "";

    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }

    return text;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();

    if (selectedText) {
        alert("Got selected text:\n" + selectedText);
    }
}

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;

// $('div').mouseup(function() {
//     var text=getSelectedText();
//     if (text!='') alert(text);
// });