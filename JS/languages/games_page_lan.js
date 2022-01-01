loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineGameLanguage(savedLanguage, json);
});

// define language via saved language
function DefineGameLanguage(language, languages){
    if(language === 'en'){
        prev_btn.innerHTML = languages.en.prev_btn;
        next_btn.innerHTML = languages.en.next_btn;
        prev_btn2.innerHTML = languages.en.prev_btn;
        next_btn2.innerHTML = languages.en.next_btn;

        btn_1.innerHTML = languages.en.game_btn_1;
        btn_2.innerHTML = languages.en.game_btn_2;
        btn_3.innerHTML = languages.en.game_btn_3;
        
        game_title_text.innerHTML = languages.en.game_title_text;
        game_dse.innerHTML = languages.en.game_dse;

        game_warning_text.innerHTML = languages.en.game_warning_text;
        
    }else if(language === 'cn'){
        prev_btn.innerHTML = languages.cn.prev_btn;
        next_btn.innerHTML = languages.cn.next_btn;
        prev_btn2.innerHTML = languages.cn.prev_btn;
        next_btn2.innerHTML = languages.cn.next_btn;
        
        btn_1.innerHTML = languages.cn.game_btn_1;
        btn_2.innerHTML = languages.cn.game_btn_2;
        btn_3.innerHTML = languages.cn.game_btn_3;
        
        game_title_text.innerHTML = languages.cn.game_title_text;
        game_dse.innerHTML = languages.cn.game_dse;

        game_warning_text.innerHTML = languages.cn.game_warning_text;
    }
}
