var $button = $(".search-button");
var $container = $(".body-container");

$button.on("click", function(event){
    event.preventDefault();
    $container.fadeOut("slow", function(){
        window.location.replace("map.html");
    });
})