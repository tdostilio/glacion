var GOOGLE_MAPS_API = "AIzaSyDiqCd6BJiVSW2HnxSSEFfqhCboUrToFPw";
var DICE_BASE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?";
var GMAPS_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
// EXAMPLE SEARCH FOR DICE
// http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=java&city=New+York,+NY search for java jobs in the New York, NY area

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

// Main Search Function
// getServerData("Java",30342,1)
//     .then(function(data) {
//        return getDataArray(data)})
//             .then(function(data) {
//                 console.log(getCompanyName(data))
//                 return (getCompanyName(data))
//             });

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

var TestString = localTestData[0];
// console.log(TestString)
// console.log(GMAPS_URL+TestString+'&key='+GOOGLE_MAPS_API)
function convertZiptoCity(zipcode) {
    return $.get("http://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&sensor=true")
        .then (function(data) {
            return data.results[0].address_components[1].long_name;
        })
}

convertZiptoCity(30342)
    .then (function(data) {
        console.log(data);
    })


function getCoordinates(array, location){
    return convertZiptoCity(30342)
    .then (function(city) {
        var coordinatesPromisesArray = array.map( function(item) {
                console.log(GMAPS_URL+item+city+"corporate"+'&key='+GOOGLE_MAPS_API);
                return $.get(GMAPS_URL+item+city+"corporate"+'&key='+GOOGLE_MAPS_API)
                    .then (function(data) {
                        return data.results})
                    .then (function(data) {
                        return data[0].geometry})
                    .then (function(data) {
                    return data.location;
                    }).catch(console.log.bind(console));
            });
            return Promise.all(coordinatesPromisesArray);
        })
}

getCoordinates(localTestData,30342)
    .then (function(dataArray) {
        console.log(dataArray);
    })
;

