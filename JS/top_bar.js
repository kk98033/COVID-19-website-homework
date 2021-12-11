const dropdown = document.getElementById("dropdown");
const topBar = document.getElementById("topBar")
const backToTop = document.getElementById("backToTop");

// Top bar appear when scroll down
// document.getElementById("body").addEventListener("scroll", ScrollFunction);
window.addEventListener("scroll", ScrollFunction);

ShowTop();
topBar.style.backgroundColor = "";

var lastScroll = 0;
function ScrollFunction(){
    if (document.documentElement.scrollTop === 0){
        topBar.style.backgroundColor = "";
    }
    else if (document.documentElement.scrollTop < lastScroll){
        ShowTop();
    }
    else{
        HideTop();
    }
    lastScroll = document.documentElement.scrollTop;
}

function ShowTop(){
    document.getElementById("topBar").style.top = "0";
    document.getElementById("bar").style.top = "20px";
    document.getElementById("topBar").style.backgroundColor = "rgba(48, 48, 48, 0.77)";

    backToTop.style.opacity = "1";
    // backToTop.style.display = "block";
}

function HideTop(){
    document.getElementById("topBar").style.top = "-50px";
    document.getElementById("bar").style.top = "-50px";
    document.getElementById("topBar").style.backgroundColor = "";

    backToTop.style.opacity = "0";
    // backToTop.classList.toggle('fade');
    // backToTop.style.display = "none";
}

/// Dropdown ///
// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        CloseDropdown()
    }
}

function ShowDropdown(){
    document.getElementById("dropdown").classList.toggle("show");
    
}
function CloseDropdown(){
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
}