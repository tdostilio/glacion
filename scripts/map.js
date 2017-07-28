function initMap() {
    // On Resize
    // $(window).resize(function(){ 
    //     $('#map').height($(window).height());
    // });

    var uluru = {lat: 33.848795, lng: -84.373567};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}