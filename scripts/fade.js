var $button = $(".search-button");
var $container = $(".body-container");

// DOES SOMETHING ON BUTTON CLICK
$button.on("click", function(event){
    event.preventDefault();
    // FADES OUT AND CALLS MAP.HTML 
    $container.fadeOut("slow", function(){
        // window.location.replace("map.html");
    });
})