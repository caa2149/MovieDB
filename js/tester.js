function getLongest(property,list) {
    var list = list || allMovies;
    var largest = [0,"property","imdbID"];
    for (m in list) {
        if (list[m][property].length > largest[0]) {
            largest = [list[m][property].length,
                       list[m][property],
                       list[m].imdbID];
        }
    }
    return largest;
}
// getLongest("Title") // gets the movie with the longest title, its count and imdbID

function getDistribution(property,ignore,list) {
    var ignore = ignore || 0;
    var list = list || allMovies;
    var types = uniqueList(property); // uniqueList(property) is in movies.js
    var obj = {};
    
    for (t in types) {
        var count = 0;
        for (m in list) {
            if (list[m][property].indexOf(types[t]) != -1) {
                count++;
            }
        }
        obj[types[t]] = count;
    }
    
    for (a in obj) {
        if (obj[a] < ignore) {
            delete obj[a];
        }
    }
    
    return obj;
}
// getDistribution("Actors",6); // gets an object of people who have been in 6 or more movies

var movies = [];
function makeMovies(output,IDs,i) {
    IDs = IDs || allMovies;
    i = i || 0;
    var url = "http://www.omdbapi.com/?i="+IDs[i].imdbID+"&plot=short&r=json";
    $.ajax(url).done(function(data) {
                     output.push(data);
                     if (!(typeof IDs[i+1] == "undefined")) {
                     makeMovies(output,IDs,i+1);
                     }
                     });
}
// makeMovies(movies);

var rndObj = { fruit:"apple",car:"volvo",tree:"walnut",computer:"mac"}
function reverseKVpairs(orig) {
    var y = {};
    for (i in orig) { y[orig[i]] = i; }
    return y;
}
// rndObj = reverseKVpairs(rndObj);