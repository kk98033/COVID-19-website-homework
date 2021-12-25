const toggle = document.getElementById('toggle');
toggle.addEventListener('change', function() {
    var text = '抱歉，我本來要做切換深色和淺色模式，但太麻煩了，我懶得做(´Ａ｀。)'
    if(toggle.checked){
        // console.log('checked')
        // SwitchToLightMode()
        showMessage(text, 8000, 9);
    }else{
        showMessage(text, 8000, 9);
        // console.log('not')
    }
});

function SwitchToDarkMode(){
    // console.log('dark');
}

function SwitchToLightMode(){
    var elements = document.querySelectorAll('.section');
    elements.forEach(element => element.classList.toggle('lightBody'));
    // console.log('light');
}