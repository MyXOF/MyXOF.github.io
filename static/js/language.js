/**
 * Created by xuyi on 9/24/15.
 */

var zh_lang = {
    "navigation":"导航",
    "resume":"简历",
    "blog":"博客",
    "homepage":"主页",
    "about":"关于",
    "language":"语言",
    "hello-light":"你好，我是徐毅",
    "welcome-light":"欢迎来到我的世外天堂",
    "hello-dark":"不用担心",
    "welcome-dark":"一切很快都会按我计划的那样结束"
};

var en_lang = {
    "navigation":"Navigation",
    "resume":"Resume",
    "blog":"Blog",
    "homepage":"Homepage",
    "about":"About",
    "language":"Language",
    "hello-light":"Hello,I'm Xu Yi",
    "welcome-light":"Welcome to my Outer Heaven",
    "hello-dark":"Don't worry",
    "welcome-dark":"It will soon end as I planned"
};

var lang_menu = false;

var lang_default="zh";

jQuery(document).ready(function(){
    lang_default="zh";
    setLanguage("zh",zh_lang);

    jQuery("#menu-list").bind("click",function(){
        hideLanguageOption();
    });

    jQuery("#exit-cross").bind("click",function(){
        hideLanguageOption();
    });

    jQuery("#lang-option").bind("click",function(){
        if(!lang_menu){
            jQuery(".lang-option").fadeIn(1000);
        }
        else{
            jQuery(".lang-option").fadeOut(1000);
        }
        lang_menu = !lang_menu;
    });

    jQuery("#zh-lang").bind("click", function () {
        if(lang_default == "zh"){
            hideLanguageOption();
            return;
        }
        setLanguage("zh",zh_lang);
        hideLanguageOption();
    });

    jQuery("#en-lang").bind("click", function () {
        if(lang_default == "en"){
            hideLanguageOption();
            return;
        }
        setLanguage("en",en_lang);
        hideLanguageOption();
    });
});

function hideLanguageOption(){
    if(lang_menu){
        jQuery(".lang-option").fadeOut();
        lang_menu = false;
    }
}

function setLanguage(lang,content){
    jQuery(".lang-content").each(function(){
        this.innerText = content[this.id];
    });
    lang_default = lang;

}