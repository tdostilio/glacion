var GOOGLE_MAPS_API = "AIzaSyDiqCd6BJiVSW2HnxSSEFfqhCboUrToFPw";
var DICE_BASE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?"
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
getServerData("Java",30342,1)
    .then(function(data) {
       return getDataArray(data)})
            .then(function(data) {
                console.log(getCompanyName(data))
                return (getCompanyName(data))
            });






