# glacion ![Alt text](images/glacion-logo-red.svg?raw=true)

## Overview: Glacion is a web application that helps people find the locations of specific job concentrations in an area. This is helpful in deciding where someone should live if they move to a new city or when looking for their next job. The user is prompted with a city they would like to live in, a job they would like to have, and a time frame the job has been listed in. Glacion takes the user's information and displays a heat map overlay on a Google map. High heat areas show where jobs are concentrated. This gives the user an idea of where they should move to. 

##Team Members & Roles: Click on each member's name to see their GitHub profile. All team members are students in the Digital Crafts June 2017 cohort. This project was our first paired project, in which, we used our front-end development skills. 

  - Tom D'Ostilio
  Primary Team Role: Front-End
  Contributions: Tom developed most of the JavaScript involved in the project. Tom connected to Dice's API to gather data and retrieved the company name from job posting. Using the company name along with a few keywords and the zip code information provided by user he searched the Google Maps API and pulled the coordinates for the company location. He then stored them in local storage in an array for later use as objects for the heat map overlay.
  Key Code Portions: Wrote JavaScript to access Dice Api, geocode the data, and pass to a google map to be displayed. 
  
  - Max Irvine
  Primary Team Role: UI/UX, Front-End backup
  Contributions: Max did the design of the Glacion site. He incorporated multiple JavaScript libraries: such as granim.js and page.js. He created the logo in Adobe Illustrator. Max also worked alongside Tom to link Tom's work to Google Maps. 
  Key Code Portions: Wrote the HTML and CSS for the site, developed logo design, and connected Google Map. 
  
##Languages we used: 
  - HTML5
  - CSS
  - JavaScript(jQuery)
  
  Library:
  - Page.js
  - Granim.js
  - Google Maps Visualization Library
  
##MVP (Minimum Viable Product): This was our first front-end project for all team members. 

Initial MVP
  - add input form
  - add Google Maps
  - Connect Dice API
  - add job data to Google Map using pins
  - mobile first resposive design
  
Strech Goals
  - add heat map layer
  - customize the standard google map 
  - add custom logo
  - add beautiful background
  - add specific job posting information and recruiter info on map
  
Challenges & Solutions:
Some of the biggest challenges we faced with this project build included: 

  The first big challenge was finding a suitable API for our project goal. All the free APIs we found were significantly flawed, and all of the decent ones were private or required partnership. The one we settled on was a free API from Dice.com which successfully pulled a lot of data, however it lacked an address for the company or job posting... Due to time constraints we were unable to wait for a premium API so we invented a work-around. We decided to circumvent this problem by adding an intermediary step where we text searched the company title along with the zipcode the user entered into google maps and a keyword "corporate" and pulled the coordinates of the first result. The use of "corporate" in the search was to eliminate addresses returned from fast food chains or local retail offices. This was tested using Chik Fil A in Atlanta and the address queried moved from a location on Roswell road to the company headquarters where the job was posted. We experienced a ~10% data loss using this method as some companies were unable to be found due to various reasons, however the location information we did pull was more accurate. 

  Some of the technical challenges lay in the returning of large promise chains where we were unable to get usuable data until everything had run. Using return Promise.all(...) was our solution and allowed the functions to complete all promises before returning the data we sought. 

  Another technical challenge was getting the job posting results in a usuable form. The DICE API was limited to 50 results per page,and in broad queries with job postings numbering in the thousands we needed a solution. We decided to use a for-loop from 1 to Math.ceil(jobCount/50) to loop through every page and push all the data into an array we could manipulate in later functions.

  The last big challenge, and ultimately the greatest challenge we faced was the quota limit on queries from Google Maps on their Web API. At a limit of 2,500 requests per day we found ourselves locked out on our very first day of testing. To help with this problem we decided to limit search results to 250 queries to give ourselves room to test. Anything less than 250 would fail to populate a heatmap of any significance, and anything more would reduce our ability to test. If we intended to take this product live and allow public use we would need to pay for a premium membership. Another possible solution involves caching data for popular searches in major cities.
  
##Code Snippets
<!--Below is the main search function that occus on form submit -->
$FORM.on('submit', function(event) {
    event.preventDefault();
    $.getScript("pace/pace.js", function(){
        Pace.start();
    });
    console.log('hello');
    getServerData($CRITERIA.val(),$LOCATION.val(),$AGE.val())
        .then(function(data) {
        return getDataArray(data)})
                .then(function(data) {
                    //Returns array of company names
                    return (getCompanyName(data))
                })
                .then(function(data) {
                    //Gets Coordinate Pairs 
                    return getCoordinates(data, $LOCATION.val());
                })
                .then(function(data) {
                    return data;
                })
                .then(function(data) {
                    //Stores coordinate Array to Local Storage
                    localStorage.setItem('coordinateArray',JSON.stringify(data));

                    // FADES OUT AND CALLS MAP.HTML 
                    $container.fadeOut("slow", function(){
                        window.location.replace("map.html");
                    });  
                })
});

//This is our Get Coordinates Function  
function getCoordinates(array, zipcode){
    return convertZiptoCity(zipcode)
    .then (function(city) {
        var shortenedArray = [];
        //Shortens query results to a maximum of 250 results
        if (array.length > 250) {
            var subtractor = array.length - 250;
            shortenedArray = array.splice(subtractor);
        }
        else {
            shortenedArray = array;
        }
        var coordinatesPromisesArray = shortenedArray.map( function(item) {
          //Using this shortened array - retrieve the coordinates of the first result matching the below query and map the coordinates to a new array
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
            //Removes all undefined values 
            return Promise.all(coordinatesPromisesArray)
            .then(function(dataArray) {
                return dataArray.filter(function(item) {
                    return item;
                });
            });
        });
}

##Screenshots


##Desired Contributions: We love anyone who is willing to contibute to our project. Here are some features we have not implemented that would make the site better.
  - unlimited geocoding API
  - integration with airBnB to display places to rent
  - allow recruiter information to be gather on clicking a heatmap     object

##Contributing
  1. Fork it
  2. Create a new feature branch(named after your intended feature):    git checkout -b new-feature-name
  3. Commit your changes: git commit -am 'added the feature!'
  4. Push to your feature branch: git push origin new-feature-name
  5. Submit a pull request!
  6. We will review and get back to you!
  
##Project History
Start: 07/27/17
End: 08/1/17