(function($) {
    var leftGame = $('#Left');
    var rightGame = $('#Right');

    function resetGames() {
        var config = {
            method: 'get',
            url: '/ratings/reset'
        };
        $.ajax(startConfig).then(function(response){
            var leftHTML = "<h1 id='Name'>" + response.name1 + "</h1>" + 
                "<img src='" + response.image1 + "'/>" +
                "<p id='Release'>" + response.release1 + "</p>" + 
                "<p id='genre'>" + response.genre1 + "</p>" +
                "<p id='price'>" + response.price1 + "</p>";
            var rightHTML = "<h1 id='Name'>" + response.name2 + "</h1>" +
                "<img src='" + response.image2 + "'/>" +
                "<p id='Release'>" + response.release2 + "</p>" +
                "<p id='genre'>" + response.genre2 + "</p>" +
                "<p id='price'>" + response.price2 + "</p>";
            leftGame.html(leftHTML);
            rightGame.html(rightHTML);
        });
    }

    leftGame.on('click', function() {
    });

})(window.jQuery);