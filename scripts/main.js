AUTHENTIC_JOBS_API = "ba181c224a81f092ddef72c7ae0c5b84";
GOOGLE_MAPS_API = "AIzaSyDiqCd6BJiVSW2HnxSSEFfqhCboUrToFPw";
USAJOBS_API = "7YSRqOom2Y4/KQwq2r0EApibcaWm/KCuNiDAyasjox8=";
DICE_BASE_URL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?"
// EXAMPLE SEARCH FOR DICE
// http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=java&city=New+York,+NY search for java jobs in the New York, NY area

function getServerData(criteria,zipcode) {
    var locationSearch;
    var textSearch;
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
    return $.get(DICE_BASE_URL+textSearch+locationSearch);

};

console.log(getServerData("java",null));





