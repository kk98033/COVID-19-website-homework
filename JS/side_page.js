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
    document.getElementById("share-btn-id").style.left = "250px";
    
    document.getElementById("overlay").style.display = "block"
    sidePageIsOpen = true;   
}

// hide the side page
function CloseSidePage(){
    document.getElementById("sidePageId").style.width = "0px";
    // document.getElementById("main").style.marginLeft = "0";
    document.getElementById("share-btn-id").style.left = "0px";

    document.getElementById("overlay").style.display = "none"
    sidePageIsOpen = false;
}

// Hide side page when click ouside the page
function CloseSideClickingOuside(e){
    var targetId = GetSectionElementId(e);
    // console.log(targetId);
    // if (targetId != "sidePageId" && targetId != "btn" && targetId != ""){
    //     CloseSidePage();
    // }
    if (!CheckId(targetId)){
        CloseSidePage();
    }

    // Close share btn
    if(targetId != 'share-btn-id'){
        if(!CheckShareId(targetId)){
            shareOptions.classList.remove('activeBtn');
            document.getElementById('copy-btn').innerHTML = 'copy';
        }
    }
}

function CheckId(id){
    ids = ["btn", "about_text2", "cdc", "who", "tw_page", "world_page", "vaccine_page", "game_page", "covid_page", "ref_page", "sidePageId", ""];
    // console.log(id);
    return ids.includes(id);
}

function CheckShareId(id){
    ids = ["folder", "whatsapp", "instagram", "twitter", 'facebook', 'linkedin', 'share-container', 'share-btn-id', 'link-container', 'link', 'copy-btn'];

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

// Share btn
const shareBtn = document.querySelector('.share-btn');
const shareOptions = document.querySelector('.share-options');

shareBtn.addEventListener('click', () => {
    shareOptions.classList.toggle('activeBtn');
})

// Copy link
function Copy() {
    var url = document.getElementById("link");
    url.select();
    document.execCommand("copy");
    document.getElementById('copy-btn').innerHTML = 'copied!';
  }