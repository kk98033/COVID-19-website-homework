const url = `https://api.covid19api.com/total/country/taiwan`;

var twMessage;

fetch(url, {})

.then(res => res.json())
.then(data => {
    const taiwanData = data[data.length-1]
    // console.log(taiwanData)
    twMessage = SortText(taiwanData['Confirmed'])

    ShowUpdateTimeText(taiwanData['Date'])
    CreateAllTwTable(taiwanData)
})

function SortText(text){
    var messages = ['這是臺灣目前的確診數資料～', '現在臺灣已經有<span>' + text + '</span>人確診了(☍﹏⁰)'];
    
    return messages;
}

function ShowTwMessage(){
    showMessage(twMessage, 8000, 9);
}

function CreateAllTwTable(taiwanData){
    const width = window.screen.width;
    const body = document.getElementById('twTable');
    
    tbl = document.createElement('table');
    if(width <= 600){
        tbl.style.fontSize = '15px';
    }else{
        tbl.style.fontSize = '20px';
    }
    tbl.style.width = '100%';
    tbl.style.textAlign = 'center';
    tbl.style.border = '1px solid black';

    var tags = ["Country", "Confirmed", "Active", "Deaths", "Recovered"]
    var states = ["Taiwan", "Confirmed", "Active", "Deaths", "Recovered"]
    for(let i = 0; i < 2; i++){
        const tr = tbl.insertRow();
        for (let j = 0; j < 5; j++){
            const td = tr.insertCell();
            if(i === 0){
                td.appendChild(document.createTextNode(tags[j])); // top tags
                td.style.border = '1px solid black';
            }else{
                if(j === 1 || j === 3){
                    td.style.color = 'red';
                }
                if(j === 4){
                    td.style.color = 'green';
                }
                if(j === 0){
                    td.appendChild(document.createTextNode(states[j])); // state names
                    td.style.border = '1px solid black';
                }else{
                    td.appendChild(document.createTextNode(taiwanData[states[j]])); // datas
                    td.style.border = '1px solid black';
                }
            }
        }
    }
    body.appendChild(tbl);
}

function ShowUpdateTimeText(date){
    const text = document.getElementById('updateTime');
    text.textContent = `Update time: ` + date;
}