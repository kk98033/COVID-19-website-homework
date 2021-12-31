loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineTwLanguage(savedLanguage, json);
});

// define language via saved language
function DefineTwLanguage(language, languages){
    if(language === 'en'){
        prev_btn.innerHTML = languages.en.prev_btn;
        next_btn.innerHTML = languages.en.next_btn;
        prev_btn2.innerHTML = languages.en.prev_btn;
        next_btn2.innerHTML = languages.en.next_btn;

        btn_1.innerHTML = languages.en.Tw_btn_1;
        btn_2.innerHTML = languages.en.Tw_btn_2;
        btn_3.innerHTML = languages.en.Tw_btn_3;
        
        tw_big_title.innerHTML = languages.en.tw_page2;
        
        tw_page_btn.innerHTML = languages.en.tw_page_btn;
        world_page_btn.innerHTML = languages.en.world_page_btn;
        
        tw_cases.innerHTML = languages.en.tw_cases;
        tw_news.innerHTML = languages.en.tw_news;
        
    }else if(language === 'cn'){
        prev_btn.innerHTML = languages.cn.prev_btn;
        next_btn.innerHTML = languages.cn.next_btn;
        prev_btn2.innerHTML = languages.cn.prev_btn;
        next_btn2.innerHTML = languages.cn.next_btn;
        
        btn_1.innerHTML = languages.cn.Tw_btn_1;
        btn_2.innerHTML = languages.cn.Tw_btn_2;
        btn_3.innerHTML = languages.cn.Tw_btn_3;
        
        tw_big_title.innerHTML = languages.cn.tw_page2;
        
        tw_page_btn.innerHTML = languages.cn.tw_page_btn;
        world_page_btn.innerHTML = languages.cn.world_page_btn;
        
        tw_cases.innerHTML = languages.cn.tw_cases;
        tw_news.innerHTML = languages.cn.tw_news;
    }
}
