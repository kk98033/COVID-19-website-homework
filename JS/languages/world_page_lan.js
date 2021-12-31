loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineWorldLanguage(savedLanguage, json);
});

// define language via saved language
function DefineWorldLanguage(language, languages){
    if(language === 'en'){
        prev_btn.innerHTML = languages.en.prev_btn;
        next_btn.innerHTML = languages.en.next_btn;
        prev_btn2.innerHTML = languages.en.prev_btn;
        next_btn2.innerHTML = languages.en.next_btn;

        btn_1.innerHTML = languages.en.world_btn_1;
        btn_2.innerHTML = languages.en.world_btn_2;
        btn_3.innerHTML = languages.en.world_btn_3;
        
        world_big_title.innerHTML = languages.en.world_page2;

        search_title.innerHTML = languages.en.search_title;
        states_title.innerHTML = languages.en.states_title;
        
        tw_page_btn.innerHTML = languages.en.tw_page_btn;
        world_page_btn.innerHTML = languages.en.world_page_btn;
        
    }else if(language === 'cn'){
        prev_btn.innerHTML = languages.cn.prev_btn;
        next_btn.innerHTML = languages.cn.next_btn;
        prev_btn2.innerHTML = languages.cn.prev_btn;
        next_btn2.innerHTML = languages.cn.next_btn;
        
        btn_1.innerHTML = languages.cn.world_btn_1;
        btn_2.innerHTML = languages.cn.world_btn_2;
        btn_3.innerHTML = languages.cn.world_btn_3;
        
        world_big_title.innerHTML = languages.cn.world_page2;
        
        search_title.innerHTML = languages.cn.search_title;
        states_title.innerHTML = languages.cn.states_title;
        
        tw_page_btn.innerHTML = languages.cn.tw_page_btn;
        world_page_btn.innerHTML = languages.cn.world_page_btn;
    }
}
