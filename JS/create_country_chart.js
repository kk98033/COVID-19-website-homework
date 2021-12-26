function CreateCountryTable(){
    countryName = userInput.value;
    var url = `https://api.covid19api.com/total/country/` + countryName;
    
    fetch(url, {})
    
    .then(res => res.json())
    .then(data => {
        var countryData = data[data.length-1]
        // console.log(countryData)
        // countryMessage = SortText(countryData['Confirmed'])
    
        // ShowUpdateTimeText(countryData['Date'])
        CreateTable(countryData)
    })
}

function OrganizeStates(name){
    if(name === 'Taiwan, Republic of China'){
        var states = ['Taiwan'];    
    }else if(name === 'United States of America'){
        var states = ['USA'];    
    }else if(name === 'UUnited Kingdom'){
        var states = ['UK'];    
    }else{
        var states = [name];
    }

    states.push("Confirmed", "Active", "Deaths", "Recovered");

    return states;
}

function DeleteChart(){
    // Delete element
    countryTable.remove();

    // Create new element
    var element = document.createElement('div');
    element.setAttribute('id', 'countryTable');

    countryTableContainer.appendChild(element);
}

function CreateTable(countryData){
    // Delete old chart and replace with a new chart
    DeleteChart();

    const width = window.screen.width;
    const body = document.getElementById('countryTable');

    tbl = document.createElement('table');
    if(width <= 600){
        tbl.style.fontSize = '15px';
    }else{
        tbl.style.fontSize = '20px';
    }
    tbl.style.width = '100%';
    tbl.style.textAlign = 'center';
    tbl.style.border = '1px solid black';

    var tags = ["Country", "Confirmed", "Active", "Deaths", "Recovered"];
    if(countryData){ 
        var states = OrganizeStates(countryData.Country); 
    }else{
        var states = ["N/A", "Confirmed", "Active", "Deaths", "Recovered"]
    }

    // console.log(states);
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
                    td.appendChild(document.createTextNode(states[j])); // Create state names
                    td.style.border = '1px solid black';
                }else{
                    if(countryData){ 
                        td.appendChild(document.createTextNode(countryData[states[j]])); // Create datas
                    }else{
                        td.appendChild(document.createTextNode('N/A'))
                    }
                    td.style.border = '1px solid black';
                }
            }
        }
    }
    body.appendChild(tbl);
}