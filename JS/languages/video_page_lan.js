loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineVideoLanguage(savedLanguage, json);
});

// define language via saved language
function DefineVideoLanguage(language, languages){
    if(language === 'en'){
        prev_btn.innerHTML = languages.en.prev_btn;
        next_btn.innerHTML = languages.en.next_btn;
        prev_btn2.innerHTML = languages.en.prev_btn;
        next_btn2.innerHTML = languages.en.next_btn;

        btn_1.innerHTML = languages.en.video_btn_1;
        btn_2.innerHTML = languages.en.video_btn_2;
        btn_3.innerHTML = languages.en.video_btn_2;
        
        video_big_title.innerHTML = languages.en.covid_page2;

        covid_vid_1_text.innerHTML = languages.en.covid_vid_1_text;
        covid_vid_2_text.innerHTML = languages.en.covid_vid_2_text;
        covid_vid_3_text.innerHTML = languages.en.covid_vid_3_text;
        
    }else if(language === 'cn'){
        prev_btn.innerHTML = languages.cn.prev_btn;
        next_btn.innerHTML = languages.cn.next_btn;
        prev_btn2.innerHTML = languages.cn.prev_btn;
        next_btn2.innerHTML = languages.cn.next_btn;
        
        btn_1.innerHTML = languages.cn.video_btn_1;
        btn_2.innerHTML = languages.cn.video_btn_2;
        btn_3.innerHTML = languages.cn.video_btn_3;
        
        video_big_title.innerHTML = languages.cn.covid_page2;
        
        covid_vid_1_text.innerHTML = languages.cn.covid_vid_1_text;
        covid_vid_2_text.innerHTML = languages.cn.covid_vid_2_text;
        covid_vid_3_text.innerHTML = languages.cn.covid_vid_3_text;
    }
}
