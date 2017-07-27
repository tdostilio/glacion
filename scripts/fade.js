var $button = $(".search-button");
var $container = $(".body-container");

$button.on("click", function(event){
    $container.fadeOut("slow");
    window.location.replace("map.html");
})