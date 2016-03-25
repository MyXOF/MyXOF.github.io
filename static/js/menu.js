/**
 * Created by xuyi on 9/29/15.
 */



jQuery(document).ready(function(){
    var LANG_URL = "http://myxof.github.io/static/lang/";
    var langDefault = "zh";
    var lang_menu = false;

    setLanguage(langDefault);

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
        if(langDefault == "zh"){
            hideLanguageOption();
            return;
        }
        setLanguage("zh");
        hideLanguageOption();
    });

    jQuery("#en-lang").bind("click", function () {
        if(langDefault == "en"){
            hideLanguageOption();
            return;
        }
        setLanguage("en");
        hideLanguageOption();
    });


    function setLanguage(lang){
        var page = jQuery("body")[0].id;
        setLanuage("menu",lang);
        setLanuage(page,lang);
        langDefault = lang;
    }

    function setLanuage(part,lang){
        jQuery.ajax({
            type:"get",
            dataType:"json",
            url: LANG_URL + part +"-"+lang+".json",
            success:function(msg){
                var itemList = eval(msg).lang[0];
                jQuery(".lang-"+part+"-content").each(function(){
                    this.innerText = itemList[this.id];
                });
            }
        });

    }

    function hideLanguageOption(){
        if(lang_menu){
            jQuery(".lang-option").fadeOut();
            lang_menu = false;
        }
    }
});

