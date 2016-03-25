/**
 * Created by xuyi on 9/29/15.
 */

(function(){
    ///////////////////////////////
    // Set Home Slideshow Height
    ///////////////////////////////

    function setHomeBannerHeight() {
        var windowHeight = jQuery(window).height();
        jQuery('#header').height(windowHeight);
    }

    ///////////////////////////////
    // Center Home Slideshow Text
    ///////////////////////////////

    function centerHomeBannerText() {
        var bannerText = jQuery('#header > .center');
//        var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2);
//            bannerTextTop = bannerTextTop / 2;
//            if(bannerTextTop < 80){
//                bannerTextTop = 80;
//            }
        var bannerTextTop = (jQuery('#header').actual('height')/2) - 360/2;
        bannerText.css('padding-top', bannerTextTop+'px');
        bannerText.show();
    }

    setHomeBannerHeight();
    centerHomeBannerText();

    //Resize events
    jQuery(window).smartresize(function(){
        setHomeBannerHeight();
        centerHomeBannerText();
    });

})();