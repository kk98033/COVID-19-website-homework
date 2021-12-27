// News script
var newsIndex = 1;
ShowNews(newsIndex);

function PlusSlides(n){
    ShowNews(newsIndex += n);
}

function CurrentSlide(n){
    ShowNews(newsIndex = n);
}

function ShowNews(n){
    var slides = document.getElementsByClassName("newSlides");
    var dots = document.getElementsByClassName("dot");

    if(n > slides.length){
        newsIndex = 1;
    }
    
    if(n < 1){
        newsIndex = slides.length;
    }

    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }

    for(let i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[newsIndex-1].style.display = "flex";
    dots[newsIndex-1].className += " active";
}

// Create news
function NewsCreate(newsDic){
    var index = 1
    for(const [key, value] of Object.entries(newsDic)){
        if(!(key === 'time')){
            Object.values(value).forEach(elements => {
                var text = elements.split("_")[0];
                var link = elements.split("_")[1];
                CreateText(text, link, key);
                CreateDots(index);
                index += 1;
            });
        }
    }
    ShowNews(1);
}

function CreateText(text, link, time){
    var newSldie = document.createElement("div");
    newSldie.setAttribute("class", "newSlides");
    newSldie.setAttribute("style", "display: none");
    
    var newText = document.createElement("a");
    newText.href = link;
    newText.innerHTML = text;
    newText.setAttribute("target", "None");
    newText.setAttribute("class", "newsText");
    
    var newTime = document.createElement("div");
    newTime.innerHTML = time;
    newTime.setAttribute("class", "time");

    var newLine = document.createElement("div");
    newLine.setAttribute("class", 'vl');
    
    newSldie.appendChild(newTime);
    newSldie.appendChild(newLine);
    newSldie.appendChild(newText);
    
    document.getElementById("newsContainer").appendChild(newSldie);
}

function CreateDots(i){
    const head = "CurrentSlide(";
    const tail = ")";
    var mid = i.toString();
    var fun = head.concat(mid, tail);

    var newDot = document.createElement("span");
    newDot.setAttribute("class", "dot");
    newDot.setAttribute("onclick", fun);
    
    document.getElementById("dotContainer").appendChild(newDot);
}