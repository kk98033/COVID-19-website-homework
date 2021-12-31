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

        btn_1.innerHTML = languages.en.ref_btn_1;
        btn_2.innerHTML = languages.en.ref_btn_2;
        btn_3.innerHTML = languages.en.ref_btn_3;
        
        github_text.innerHTML = languages.en.github_text;
        reference_text.innerHTML = languages.en.reference_text;
        reference_material_text.innerHTML = languages.en.reference_material_text;
        
    }else if(language === 'cn'){
        prev_btn.innerHTML = languages.cn.prev_btn;
        next_btn.innerHTML = languages.cn.next_btn;
        prev_btn2.innerHTML = languages.cn.prev_btn;
        next_btn2.innerHTML = languages.cn.next_btn;
        
        btn_1.innerHTML = languages.cn.ref_btn_1;
        btn_2.innerHTML = languages.cn.ref_btn_2;
        btn_3.innerHTML = languages.cn.ref_btn_3;
        
        github_text.innerHTML = languages.cn.github_text;
        reference_text.innerHTML = languages.cn.reference_text;
        reference_material_text.innerHTML = languages.cn.reference_material_text;
    }
}
