GOOGLE_MAPS_API = "AIzaSyDiqCd6BJiVSW2HnxSSEFfqhCboUrToFPw";
DICE_BASE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?"
// EXAMPLE SEARCH FOR DICE
// http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=java&city=New+York,+NY search for java jobs in the New York, NY area

function getServerData(criteria,zipcode) {
    var locationSearch;
    var textSearch;
    var searchResults = [];
    var jobCount;
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

    console.log(DICE_BASE_URL+textSearch+locationSearch);
    return $.get(DICE_BASE_URL+textSearch+locationSearch)
        .then(function (data) {
            jobCount = data.count;
            console.log(jobCount);
            for (var i=1;i<(jobCount/50);i++) {
                searchResults.push($.get(DICE_BASE_URL+textSearch+locationSearch+"&page="+i));
            } console.log(searchResults)
            return searchResults;
        })
};



function getDataArray(objArray) {
    console.log(typeof objArray)
    return obj.resultItemList;
}

function getCompanyName(obj) {
    return (obj.map(function(element) {
        return element["company"]}));

}


getServerData(null,30342)
    .then(function(data) {
       return getDataArray(data)})
            .then(function(data) {
                getCompanyName(data)
            });






