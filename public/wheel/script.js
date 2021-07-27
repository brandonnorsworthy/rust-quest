//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;

$(document).ready(function () {

    /*WHEEL SPIN FUNCTION*/
    $('#spin').click(function () {

        //add 1 every click
        clicks++;

        /*multiply the degree by number of clicks
      generate random number between 1 - 360, 
    then add to the new degree*/
        var newDegree = degree * clicks;
        var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
        totalDegree = newDegree + extraDegree;

        /*let's make the spin btn to tilt every
        time the edge of the section hits 
        the indicator*/
        $('#wheel .sec').each(function () {
            var t = $(this);

            $('#inner-wheel').css({
                'transform': 'rotate(' + totalDegree + 'deg)'
            });

            // noY = t.offset().top;

        });
    });



});//DOCUMENT READY


