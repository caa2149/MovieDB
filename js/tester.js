function getLongest(property,list) {
    var list = list || allMovies;
    var largest = [0,"property","imdbID"];
    for (m in list) {
        if (list[m][property].length > largest[0] && list[m].imdbID != "tt3272570") {
            largest = [list[m][property].length,
                       list[m][property],
                       list[m].imdbID];
        }
    }
    return largest;
}

function getDistribution(property,ignore,list) {
    var ignore = ignore || 0;
    var list = list || allMovies;
    var types = uniqueList(property);
    var obj = {};
    
    for (t in types) {
        var count = 0;
        for (m in list) {
            if (list[m][property].indepropertyOf(types[t]) != -1) {
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