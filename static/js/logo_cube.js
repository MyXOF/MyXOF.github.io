/**
 * Created by xuyi on 9/25/15.
 */

var hexa,
    images = [
        './static/img/fox.png',
        './static/img/xof.png',
        './static/img/fox.png',
        './static/img/xof.png',
        './static/img/xof.png',
        './static/img/xof.png'
    ];

jQuery(document).ready(function(){
    hexa = new window.HexaFlip(document.getElementById('hexaflip'), {set: images},{size: 200});
//   hexa = new HexaFlp(document.getElementById('hexaflip'), {set: images},{
//       size: 200
//   });

   jQuery("#logo-name").bind("mouseover",function(){
       hexa.flipBack();
       hexa.flipBack();

       jQuery(".light").fadeOut(function(){
            jQuery(".dark").fadeIn();
       });
   });

   jQuery("#logo-name").bind("mouseleave",function(){
       hexa.flip();
       hexa.flip();

       jQuery(".dark").fadeOut(function(){
           jQuery(".light").fadeIn();
       });
   });
});