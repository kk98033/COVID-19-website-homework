loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineMainLanguage(savedLanguage, json);
});

// define language via saved language
function DefineMainLanguage(language, languages){
    if(language === 'en'){
        tw_data.innerHTML = languages.en.tw_page2;
        world_data.innerHTML = languages.en.world_page2;
        vaccine_data.innerHTML = languages.en.vaccine_page2;
        game_data.innerHTML = languages.en.game_page2;
        video_data.innerHTML = languages.en.covid_page2;
        ref_data.innerHTML = languages.en.ref_page2;

        des_tw.innerHTML = languages.en.des_tw;
        des_world.innerHTML = languages.en.des_world;
        des_vaccine.innerHTML = languages.en.des_vaccine;
        des_video.innerHTML = languages.en.des_video;
        des_game.innerHTML = languages.en.des_game;
        des_ref.innerHTML = languages.en.des_ref;

        big_title.innerHTML = languages.en.big_title;
        introduction.innerHTML = languages.en.introduction;
        
    }else if(language === 'cn'){
        tw_data.innerHTML = languages.cn.tw_page2;
        world_data.innerHTML = languages.cn.world_page2;
        vaccine_data.innerHTML = languages.cn.vaccine_page2;
        game_data.innerHTML = languages.cn.game_page2;
        video_data.innerHTML = languages.cn.covid_page2;
        ref_data.innerHTML = languages.cn.ref_page2;
        
        des_tw.innerHTML = languages.cn.des_tw;
        des_world.innerHTML = languages.cn.des_world;
        des_vaccine.innerHTML = languages.cn.des_vaccine;
        des_video.innerHTML = languages.cn.des_video;
        des_game.innerHTML = languages.cn.des_game;
        des_ref.innerHTML = languages.cn.des_ref;
        
        big_title.innerHTML = languages.cn.big_title;
        introduction.innerHTML = languages.cn.introduction;
    }
}
