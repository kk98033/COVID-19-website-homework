// Load Json IDK how this works :L 
// source: https://stackoverflow.com/questions/48073151/read-local-json-file-into-variable
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'JS/languages/languages.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);  

    // If user first load this website, set the lagugage to Chinese
    if(!GetSavedLanguage()){
        console.log('First time load');
        localStorage.setItem("Language", 'cn');
    }
}

function GetSavedLanguage(){
    var language = localStorage.getItem("Language");
    // console.log(language);
    
    return language;
}


function SwitchToEN(){
    // save current language
    localStorage.setItem("Language", 'en');

    reload();
}

function SwitchToCN(){
    // save current language
    localStorage.setItem("Language", 'cn');

    reload();
}

function reload(){ window.location.reload(); }