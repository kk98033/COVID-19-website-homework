function tableCreate(){
    const worldDic = JSON.parse(localStorage.getItem("worldDic")); 

    const width = window.screen.width;
    const body = document.getElementById("worldTable");
    
    tbl = document.createElement('table');
    if(width <= 600){
        tbl.style.fontSize = '15px';
    }else{
        tbl.style.fontSize = '20px';
    }
    tbl.style.width = '100%';
    tbl.style.textAlign = 'center';
    tbl.style.border = '1px solid black';

    updateTime.innerHTML = "update time: " + worldDic['time'];

    var tags = ["State", "Total Cases", "New Cases", "Total Deaths", "New Deaths", "Total Recovered", "New Recovered"]
    var states = ['World', 'Asia', 'Europe', 'North_America', 'South_America', 'Africa', 'Oceania']
    for(let i = 0; i < 8; i++){
            const tr = tbl.insertRow();
            for (let j = 0; j < 7; j++){
                const td = tr.insertCell();
                if(i === 0){
                    td.appendChild(document.createTextNode(tags[j])); // top tags
                    td.style.border = '1px solid black';
                }else{
                    if(j === 2 || j === 4){
                        td.style.color = 'red';
                    }
                    if(j === 6){
                        td.style.color = 'green';
                    }
                    if(j === 0){
                        td.appendChild(document.createTextNode(CheckStateName(states[i-1]))); // state names
                        td.style.border = '1px solid black';
                    }else{
                        td.appendChild(document.createTextNode(worldDic[states[i-1]][j-1])); // datas
                        td.style.border = '1px solid black';
                    }
                }
            }
    }
    body.appendChild(tbl);
}

function CheckStateName(name){
    if(name === 'North_America'){
        name = 'North America';
    }else if(name === 'South_America'){
        name = 'South America';
    }

    return name;
}