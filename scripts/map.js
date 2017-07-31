 var map, heatmap;

function initMap() {
    var uluru = {lat: 33.7, lng: -84.4};

    var mapOptions = {
        zoom: 10,
        center: uluru,
        styles: [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 13
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#144b53"
                },
                {
                    "lightness": 14
                },
                {
                    "weight": 1.4
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#08304b"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0c4152"
                },
                {
                    "lightness": 5
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#0b434f"
                },
                {
                    "lightness": 25
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#0b3d51"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#146474"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#021019"
                }
            ]
        }
    ]
    }
    var mapElement = document.getElementById('map');

    var map = new google.maps.Map(mapElement, mapOptions);

    var heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map,
          radius: 50,
        //   gradient: [
        //   'rgba(0, 0, 191, 1)',
        //   'rgba(0, 0, 159, 1)',
        //   'rgba(0, 0, 127, 1)',
        //   'rgba(63, 0, 91, 1)',
        //   'rgba(127, 0, 63, 1)',
        //   'rgba(191, 0, 31, 1)',
        //   'rgba(255, 0, 0, 1)'
        // ]
    });

//    var gradient = [
//             'rgba(0, 0, 191, 1)',
//           'rgba(0, 0, 159, 1)',
//           'rgba(0, 0, 127, 1)',
//           'rgba(63, 0, 91, 1)',
//           'rgba(127, 0, 63, 1)',
//           'rgba(191, 0, 31, 1)',
//           'rgba(255, 0, 0, 1)'
//         ]
//    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);


    //RESIZES MAP
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}

function getPoints() {
    var data = JSON.parse(localStorage.getItem("coordinateArray"));
    var arr = data.map(function(item) {
        var lat = item["lat"];
        var lng = item["lng"];
        return new google.maps.LatLng(lat, lng);
    });
    return arr;
}



    
