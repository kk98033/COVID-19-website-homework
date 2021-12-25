loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineLanguage(savedLanguage, json);
});

// define language via saved language
function DefineLanguage(language, languages){
    // console.log(window.location.hash);
    if(language === 'en'){
        language_text.textContent = languages.en.language;
        home_text.textContent = languages.en.home;
        about_text.textContent = languages.en.about_us;

        about_text2.textContent = languages.en.about_text2;
        cdc.textContent = languages.en.cdc;
        who.textContent = languages.en.who;
        tw_page.textContent = languages.en.tw_page;
        world_page.textContent = languages.en.world_page;
        vaccine_page.textContent = languages.en.vaccine_page;
        game_page.textContent = languages.en.game_page;
        covid_page.textContent = languages.en.covid_page;
        ref_page.textContent = languages.en.ref_page;
        
        contact_me.textContent = languages.en.contact_me;
        credit_text.textContent = languages.en.credit_text;
        
    }else if(language === 'cn'){
        language_text.textContent = languages.cn.language;
        home_text.textContent = languages.cn.home;
        about_text.textContent = languages.cn.about_us;
        
        about_text2.textContent = languages.cn.about_text2;
        cdc.textContent = languages.cn.cdc;
        who.textContent = languages.cn.who;
        tw_page.textContent = languages.cn.tw_page;
        world_page.textContent = languages.cn.world_page;
        vaccine_page.textContent = languages.cn.vaccine_page;
        game_page.textContent = languages.cn.game_page;
        covid_page.textContent = languages.cn.covid_page;
        ref_page.textContent = languages.cn.ref_page;

        contact_me.textContent = languages.cn.contact_me;
        credit_text.textContent = languages.cn.credit_text;
    }
}
