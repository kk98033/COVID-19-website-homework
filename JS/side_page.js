/// Side bar fuction ///
var sidePageIsOpen = Boolean(false);

function CheckState(){
    if (sidePageIsOpen){
        CloseSidePage();
    }
    else{
        OpenSidePage();
    }
}

// show the side page
function OpenSidePage(){
    document.getElementById("sidePageId").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";

    document.getElementById("overlay").style.display = "block"
    sidePageIsOpen = true;   
}
    
// hide the side page
function CloseSidePage(){
    document.getElementById("sidePageId").style.width = "0px";
    // document.getElementById("main").style.marginLeft = "0";

    document.getElementById("overlay").style.display = "none"
    sidePageIsOpen = false;
}

// Hide side page when click ouside the page
function CloseSideClickingOuside(e){
    var targetId = GetSectionElementId(e);
    if (!CheckId(targetId)){
        CloseSidePage();
    }
}

function CheckId(id){
    ids = ["btn", "about_text2", "cdc", "who", "tw_page", "world_page", "vaccine_page", "game_page", "covid_page", "ref_page", "sidePageId"];
    // console.log(id);
    return ids.includes(id);
}

function GetSectionElementId(e){
    var targetId = e.target.id;
    
    return targetId
}

// Get mouse
function CheckIfMouseOnTop(event){
    x = event.clientX;
    y = event.clientY;
}