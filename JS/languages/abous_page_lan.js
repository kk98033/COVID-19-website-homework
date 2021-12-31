loadJSON(function(json) {
    // console.log(json); // this will log out the json object
    savedLanguage = GetSavedLanguage();
    DefineTwLanguage(savedLanguage, json);
});

// define language via saved language
function DefineTwLanguage(language, languages){
    if(language === 'en'){
        abous_title.innerHTML = languages.en.abous_title;
        nam_text_1.innerHTML = languages.en.nam_text_1;
        nam_text_2.innerHTML = languages.en.nam_text_2;
        nam_text_3.innerHTML = languages.en.nam_text_3;

        des_text_1.innerHTML = languages.en.des_text_1;
        des_text_2.innerHTML = languages.en.des_text_2;
        des_text_3.innerHTML = languages.en.des_text_3;
        
        contact_me_text_1.innerHTML = languages.en.contact_me_text;
        contact_me_text_2.innerHTML = languages.en.contact_me_text;
        contact_me_text_3.innerHTML = languages.en.contact_me_text;
        
        profile_des_text_1.innerHTML = languages.en.profile_des_text_1;
        profile_des_text_2.innerHTML = languages.en.profile_des_text_2;
        profile_des_text_3.innerHTML = languages.en.profile_des_text_3;

    }else if(language === 'cn'){
        abous_title.innerHTML = languages.cn.abous_title;
        nam_text_1.innerHTML = languages.cn.nam_text_1;
        nam_text_2.innerHTML = languages.cn.nam_text_2;
        nam_text_3.innerHTML = languages.cn.nam_text_3;
        
        des_text_1.innerHTML = languages.cn.des_text_1;
        des_text_2.innerHTML = languages.cn.des_text_2;
        des_text_3.innerHTML = languages.cn.des_text_3;

        contact_me_text_1.innerHTML = languages.cn.contact_me_text;
        contact_me_text_2.innerHTML = languages.cn.contact_me_text;
        contact_me_text_3.innerHTML = languages.cn.contact_me_text;

        profile_des_text_1.innerHTML = languages.cn.profile_des_text_1;
        profile_des_text_2.innerHTML = languages.cn.profile_des_text_2;
        profile_des_text_3.innerHTML = languages.cn.profile_des_text_3;
    }
}
