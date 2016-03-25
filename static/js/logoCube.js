/**
 * Created by xuyi on 9/25/15.
 */

jQuery(document).ready(function () {
    var hexa,
        images = [
            './static/img/fox.png',
            './static/img/xof.png',
            './static/img/fox.png',
            './static/img/xof.png',
            './static/img/xof.png',
            './static/img/xof.png'
        ];
    hexa = new window.HexaFlip(document.getElementById('hexaflip'), {set: images}, {size: 200});

    jQuery("#logo-name").bind("mouseover", function () {
        hexa.flipBack();
        hexa.flipBack();
        jQuery(".light").css("display", "none");
        jQuery(".dark").css("display", "block");
    });

    jQuery("#logo-name").bind("mouseleave", function () {
        hexa.flip();
        hexa.flip();
        jQuery(".dark").css("display", "none");
        jQuery(".light").css("display", "block");
    });
});