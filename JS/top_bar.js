// Top bar appear when scroll down
document.getElementById("body").addEventListener("scroll", ScrollFunction);

document.getElementById("topBar").style.backgroundColor = " ";
ShowTop();

var lastScroll = 0;
function ScrollFunction(){
    if (document.body.scrollTop < lastScroll){
        ShowTop();
    }
    else{
        HideTop();
    }
    lastScroll = document.body.scrollTop;
}

function ShowTop(){
    document.getElementById("topBar").style.top = "0";
    document.getElementById("bar").style.top = "20px";
    document.getElementById("topBar").style.backgroundColor = "rgba(48, 48, 48, 0.77)";
}

function HideTop(){
    document.getElementById("topBar").style.top = "-50px";
    document.getElementById("bar").style.top = "-50px";
    document.getElementById("topBar").style.backgroundColor = "";
}

/// Dropdown ///
// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        CloseDropdown()
    }
}

function ShowDropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
    
}
function CloseDropdown(){
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
    }
}