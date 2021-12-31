loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineVaccineLanguage(savedLanguage, json);
});

// define language via saved language
function DefineVaccineLanguage(language, languages){
    if(language === 'en'){
        prev_btn.innerHTML = languages.en.prev_btn;
        next_btn.innerHTML = languages.en.next_btn;
        prev_btn2.innerHTML = languages.en.prev_btn;
        next_btn2.innerHTML = languages.en.next_btn;

        btn_1.innerHTML = languages.en.vaccine_btn_1;
        btn_2.innerHTML = languages.en.vaccine_btn_2;
        btn_3.innerHTML = languages.en.vaccine_btn_3;
        
        vaccine_big_title.innerHTML = languages.en.vaccine_page2;

        all_vaccine_title.innerHTML = languages.en.all_vaccine_title;
        chart1.innerHTML = languages.en.chart1;
        vaccine_type_title.innerHTML = languages.en.vaccine_type_title;
        reservation_text.innerHTML = languages.en.reservation_text;
        vaccine_intro_title.innerHTML = languages.en.vaccine_intro_title;

        intro_text_1.innerHTML = languages.en.intro_text;
        intro_text_2.innerHTML = languages.en.intro_text;
        intro_text_3.innerHTML = languages.en.intro_text;
        intro_text_4.innerHTML = languages.en.intro_text;

        az_title.innerHTML = languages.en.az_title;
        moderna_title.innerHTML = languages.en.moderna_title;
        bnt_title.innerHTML = languages.en.bnt_title;
        mvc_title.innerHTML = languages.en.mvc_title;
        
        az_intro_text.innerHTML = languages.en.az_intro_text;   
        moderna_intro_text.innerHTML = languages.en.moderna_intro_text;     
        bnt_intro_text.innerHTML = languages.en.bnt_intro_text;
        mvc_intro_text.innerHTML = languages.en.mvc_intro_text;

        az_overlay_text.innerHTML = languages.en.az_overlay_text;
        moderna_overlay_text.innerHTML = languages.en.moderna_overlay_text;
        bnt_overlay_text.innerHTML = languages.en.bnt_overlay_text;
        mvc_overlay_text.innerHTML = languages.en.mvc_overlay_text;
        
    }else if(language === 'cn'){
        prev_btn.innerHTML = languages.cn.prev_btn;
        next_btn.innerHTML = languages.cn.next_btn;
        prev_btn2.innerHTML = languages.cn.prev_btn;
        next_btn2.innerHTML = languages.cn.next_btn;
        
        btn_1.innerHTML = languages.cn.vaccine_btn_1;
        btn_2.innerHTML = languages.cn.vaccine_btn_2;
        btn_3.innerHTML = languages.cn.vaccine_btn_3;
        
        vaccine_big_title.innerHTML = languages.cn.vaccine_page2;
        
        all_vaccine_title.innerHTML = languages.cn.all_vaccine_title;
        chart1.innerHTML = languages.cn.chart1;
        vaccine_type_title.innerHTML = languages.cn.vaccine_type_title;
        reservation_text.innerHTML = languages.cn.reservation_text;
        vaccine_intro_title.innerHTML = languages.cn.vaccine_intro_title;
        
        intro_text_1.innerHTML = languages.cn.intro_text;
        intro_text_2.innerHTML = languages.cn.intro_text;
        intro_text_3.innerHTML = languages.cn.intro_text;
        intro_text_4.innerHTML = languages.cn.intro_text;
        
        az_title.innerHTML = languages.cn.az_title;
        moderna_title.innerHTML = languages.cn.moderna_title;
        bnt_title.innerHTML = languages.cn.bnt_title;
        mvc_title.innerHTML = languages.cn.mvc_title;
        
        az_intro_text.innerHTML = languages.cn.az_intro_text;        
        moderna_intro_text.innerHTML = languages.cn.moderna_intro_text;
        bnt_intro_text.innerHTML = languages.cn.bnt_intro_text;
        mvc_intro_text.innerHTML = languages.cn.mvc_intro_text;
        
        az_overlay_text.innerHTML = languages.cn.az_overlay_text;
        moderna_overlay_text.innerHTML = languages.cn.moderna_overlay_text;
        bnt_overlay_text.innerHTML = languages.cn.bnt_overlay_text;
        mvc_overlay_text.innerHTML = languages.cn.mvc_overlay_text;
    }
}
