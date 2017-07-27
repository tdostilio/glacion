var $button = $(".search-button");
var $container = $(".body-container");

$button.on("click", function(event){
    event.preventDefault();
    console.log("click");
    $container.removeClass(".body-container");
    $container.addClass(".fade-out");
})