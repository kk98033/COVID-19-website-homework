loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineTopBarLanguage(savedLanguage, json);
});

// define language via saved language
function DefineTopBarLanguage(language, languages){
    if(language === 'en'){
        language_text.innerHTML = languages.en.language + ' <i class="fa fa-caret-down"></i>';
        home_text.innerHTML = languages.en.home;
        about_text.innerHTML = languages.en.about_us;

        about_text2.innerHTML = languages.en.about_text2;
        cdc.innerHTML = languages.en.cdc;
        who.innerHTML = languages.en.who;
        tw_page.innerHTML = languages.en.tw_page;
        world_page.innerHTML = languages.en.world_page;
        vaccine_page.innerHTML = languages.en.vaccine_page;
        game_page.innerHTML = languages.en.game_page;
        covid_page.innerHTML = languages.en.covid_page;
        ref_page.innerHTML = languages.en.ref_page;
        
        contact_me.innerHTML = languages.en.contact_me;
        credit_text.innerHTML = languages.en.credit_text;
        
    }else if(language === 'cn'){
        language_text.innerHTML = languages.cn.language + ' <i class="fa fa-caret-down"></i>';
        home_text.innerHTML = languages.cn.home;
        about_text.innerHTML = languages.cn.about_us;
        
        about_text2.innerHTML = languages.cn.about_text2;
        cdc.innerHTML = languages.cn.cdc;
        who.innerHTML = languages.cn.who;
        tw_page.innerHTML = languages.cn.tw_page;
        world_page.innerHTML = languages.cn.world_page;
        vaccine_page.innerHTML = languages.cn.vaccine_page;
        game_page.innerHTML = languages.cn.game_page;
        covid_page.innerHTML = languages.cn.covid_page;
        ref_page.innerHTML = languages.cn.ref_page;

        contact_me.innerHTML = languages.cn.contact_me;
        credit_text.innerHTML = languages.cn.credit_text;
    }
}
