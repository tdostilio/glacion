var GOOGLE_MAPS_API = "AIzaSyCsCduOEISLakr8UrXtKcYH3Fm627jyktk"; //Tom's Key: AIzaSyDiqCd6BJiVSW2HnxSSEFfqhCboUrToFPw
var DICE_BASE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?";
var GMAPS_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
var $LOCATION = $(".search-location");
var $CRITERIA = $('.search-job-title');
var $AGE = $('.date-select');
var $FORM = $('.searchbox');


$FORM.on('submit', function(event) {
    event.preventDefault();
    console.log('hello');
    getServerData($CRITERIA.val(),$LOCATION.val(),$AGE.val())
        .then(function(data) {
        return getDataArray(data)})
                .then(function(data) {
                    console.log(getCompanyName(data))
                    // var company = getCompanyName(data);
                    return (getCompanyName(data))
                })
                .then(function(data) {
                    return getCoordinates(data, $LOCATION.val())
                })
                .then(function(data) {
                    console.log(data);
                    return data;
                })
                .then(function(data) {
                    localStorage.setItem('coordinateArray', JSON.stringify(data));
                })
});


function limit(arr) {
    console.log("Limiting------");
    var len = arr.length;
    if (len > 300) {
        return arr.splice(300);
    } else {
        return arr;
    }
}

function getServerData(criteria,zipcode,date) {
    var locationSearch;
    var textSearch;
    var searchResults = [];
    var jobCount;
    var postedBy;
        if (criteria) {
            textSearch = "text="+criteria+"&";
        } else {
            textSearch = "";
        }
        if (zipcode) {
            locationSearch = "city="+zipcode;
        } else {
            locationSearch = ""
        }
    console.log(DICE_BASE_URL+textSearch+locationSearch+"&age="+date);
    return $.get(DICE_BASE_URL+textSearch+locationSearch+"&age="+date)
        .then(function (data) {
            jobCount = data.count;
            console.log(jobCount);
            for (var i=1;i<=Math.ceil(jobCount/50);i++) {
                searchResults.push($.get(DICE_BASE_URL+textSearch+locationSearch+"&page="+i));
            } 
            return searchResults;
        })
};

function getDataArray(objectArray) {
    return Promise.all(objectArray)
        .then (function(data) {
            var jobs = data.map(function(page) {
                return (page.resultItemList)
            })
            var merged = [].concat.apply([],jobs);
            return merged;
        }) 
}


function getCompanyName(array) {
    return array.map(function(posting) {
        return posting["company"];
    });
}


var localTestData = ["Chik Fil A", "Accenture Technology Solutions", "Visionaire Partners", "Kavi Software", "Datamatics Global Services Ltd.", "Principle Solutions Group", "Visionaire Partners", "Visionaire Partners", "Genesis10", "Spectrum IT Global INC", "Pyramid Consulting, Inc.", "Arthur Lawrence", "Amzur Technologies, Inc.", "Visionaire Partners", "Brooksource", "Collabera", "Principle Solutions Group", "Visionaire Partners", "Principle Solutions Group", "Principle Solutions Group", "Visionaire Partners", "Visionaire Partners", "Prestige Staffing", "Digital Intelligence Systems, LLC", "Data Resource Technologies", "Principle Solutions Group", "Data Resource Technologies", "Veredus", "Visionaire Partners", "Principle Solutions Group", "Agile Global Solutions, Inc", "Principle Solutions Group", "Visionaire Partners", "Signature Consultants", "Pegasys Systems & Technologies Inc", "Rivi Consulting Group", "Visionaire Partners", "UST Global Inc", "ICON Technologies", "Principle Solutions Group", "Rivi Consulting Group", "Pyramid Consulting, Inc.", "Visionaire Partners", "Datanomics", "Cambridge Technical", "Kforce Inc.", "iStaff", "Travelport", "iStaff", "Swinsoft", "Metasys Technologies", "HMG America", "AptoNet Inc", "Career Guidant, Inc", "Spark Data Solutions, Inc.", "Travelport", "Mindtree Limited", "Alliance Sourcing Network", "firstPRO, Inc.", "firstPRO, Inc.", "Primus Software Corp", "AptoNet Inc", "Career Guidant, Inc", "Paramount Software Solutions, Inc", "Allied Informatics, Inc", "Travelport", "Thompson Technologies", "Robert Half Technology", "Softpros, Inc.", "Mindtree Limited", "Charter Global, Inc.", "iStaff", "iStaff", "Capgemini", "Strivector", "The Judge Group", "Routematch", "M9 Solutions", "3Ci", "Hired by Matrix, Inc.", "Stellar Consulting Solutions", "Primus Software Corp", "Routematch", "Primus Software Corp", "Paramount Software Solutions, Inc", "Metasys Technologies", "iStaff", "Cambridge Technical", "Matrix Resources", "Matrix Resources", "Squires Group, Inc", "Cambridge Technical", "ProActive Resources, Inc", "Techno-Comp, Inc.", "Open Systems Inc", "Professional Insight", "Citadel Information Services Inc", "3i People, Inc.", "Professional Insight", "Travelport", "Paramount Software Solutions, Inc"];

// console.log(localTestData[42]);
// EXAMPLE GMAPS URL
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=YOUR_API_KEY

var TestString = localTestData[0];
// console.log(TestString)
// console.log(GMAPS_URL+TestString+'&key='+GOOGLE_MAPS_API)
function convertZiptoCity(zipcode) {
    return $.get("http://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&sensor=true")
        .then (function(data) {
            return data.results[0].address_components[1].long_name;
        })
}

// convertZiptoCity($LOCATION.val)
//     .then (function(data) {
//         return (data);
//     })


function getCoordinates(array, zipcode){
    return convertZiptoCity(zipcode)
    .then (function(city) {
        var coordinatesPromisesArray = array.map( function(item) {
                // console.log(GMAPS_URL+item+"corporate"+'&key='+GOOGLE_MAPS_API);
                return $.get(GMAPS_URL+item+"corporate"+city+'&key='+GOOGLE_MAPS_API)
                    .then (function(data) {
                        return data.results})
                    .then (function(data) {
                        if (data[0]) {
                            return data[0].geometry.location;
                        } else {
                            return null;
                        }
                    }).catch(console.log.bind(console));
            });
            return Promise.all(coordinatesPromisesArray).then(function(dataArray) {
                return dataArray.filter(function(item) {
                    return item;
                });
            });
        });
}








// function convertCoordinatesHeatMap(){
//     return getCoordinates(localTestData,30342)
//         .then (function(dataArray) {
//             var HeatMapData = dataArray.map( function(element) {
//                 var testerthingy = new google.maps.LatLng(element.lat, element.lng);
//                 // debugger;
//                 return testerthingy;
//             }) 
//             return Promise.all(HeatMapData).then(function(data) {
//                 console.log(data);
//             })  
//         })
// }


// MAPPING STUFF
// var uluru = {lat: 33.848795, lng: -84.373567};
// var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 10,
//     center: uluru
// });
// var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
// });

// google.maps.event.addDomListener(window, "resize", function() {
//     var center = map.getCenter();
//     google.maps.event.trigger(map, "resize");
//     map.setCenter(center);
// });

// var heatmap = new google.maps.visualization.HeatmapLayer({
//   data: convertCoordinatesHeatMap()
// });

// heatmap.setMap(map);

// ARRAY OF HEATMAP OBJECTS
// console.log(convertCoordinatesHeatMap());

