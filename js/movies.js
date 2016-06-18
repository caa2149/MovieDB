$(document).ready(function() {
                  scrollFn();
                  themeFn();
                  console.log("page ready");
                  
                  jQ_UI_Header();
                  
                  loadMovies(mySort("Title"));
                  
                  $(".header").css("display","flex");
                  
                  $("#go").click(go);
                  
                  $("#topbutton").click(function() {
                                        $('html, body').animate({ scrollTop: 0 }, 'slow');
                                        });
                  
                  $("input").keypress(function(event){
                                      var keycode = (event.keyCode ? event.keyCode : event.which);
                                      if(keycode == '13'){
                                      go();
                                      $(this).siblings("[id^=ui-id-]").hide();
                                      }
                                      });
                  
                  $("input").hover(function() {
                                   $(this).toggleClass("ui-state-hover");
                                   });
                  });

function createMovie(m) {
    var item = "<div id='" + m.imdbID + "'class='movie'>";
        
    item += "<div class='poster'><div class='hoverdesc'></div></div>";
    
    item += "<div class='info'><div class='title'></div><div class='year'></div></div>";
    
    item += "<div class='plox-outer'><div class='plox ui-widget-content'>" +
                "<div class='poster-box'>" +
                    "<div class='poster'></div>" +
                "</div>" +
                "<div class='plot-box'>" +
                    "<p class='title'></p>" +
                    "<p class='plot'></p>" +
                "</div>" +
                "<div class='specs-box'>" +
                    "<p class='rating'></p>" +
                    "<p class='genre'></p>" +
                    "<p class='year'></p>" +
                "</div>" +
                "<div class='people-box'>" +
                    "<p class='director'></p>" +
                    "<p class='cast'></p>" +
                "</div>" +
            "</div></div>";
    
    item += "</div>";
    
    return item;
}

function addUIClass(ele=".results") {
    $(ele).find("p, .poster, .plox").addClass("ui-corner-all");
}

function loadData(list=allMovies) {
    $(".notice").text(list.length + " Movies Found");
    for (m in list) {
        var $m = $("#" + list[m].imdbID);
        
        $m.find(".title").html(list[m].Title);
        $m.find(".year").html(list[m].Year);
        $m.find(".hoverdesc").html("Rating: " + list[m].imdbRating +
                                   "<br>" + list[m].Genre);
        $m.find(".poster").css("background-image","url(" +
                               list[m].Poster + ")");
        
        
        $m.find(".plot").html(list[m].Plot);
        $m.find(".genre").html(list[m].Genre);
        $m.find(".rating").html("IMDb: " + list[m].imdbRating +
                                 "<br>Metascore: " + list[m].Metascore);
        $m.find(".director").html(list[m].Director);
        $m.find(".cast").html(list[m].Actors);
        
    }
}

// happens on page load and every time you click search
function loadMovies(list=allMovies) {
    
    $(".results").empty();
    var html = "<div class='notice'></div>";
    for (i in list) { html += createMovie(list[i]); }
    $(".results").html(html);
    
    loadData();
    addUIClass();
    
    $(".movie").click(function(event) {
                      $(this).find(".plox-outer").toggleClass("plox-visible");
                      event.preventDefault();
                      });
}

function byGenre(g,list=allMovies) {
    if (g == "!") { return; }
    for (i in list) {
        if (list[i].Genre.indexOf(g) < 0) {
            $("#" + list[i].imdbID).hide();
        }   }   }

function byRating(r,list=allMovies) {
    if (r == "!") { return; }
    for (i in list) {
        var rating = list[i].imdbRating;
        if (rating < r) {
            $("#" + list[i].imdbID).hide();
        }   }   }

function byTitle(s,list=allMovies) {
    for (i in list) {
        var contains = list[i].Title.toLowerCase().indexOf(s.toLowerCase());
        if (contains < 0) {
            $("#" + list[i].imdbID).hide();
        }   }   }

function byActor(s,list=allMovies) {
    for (i in list) {
        var contains = list[i].Actors.toLowerCase().indexOf(s.toLowerCase());
        if (contains < 0) {
            $("#" + list[i].imdbID).hide();
        }   }   }

function mySort(value,r=false,list=allMovies) {
    
    function sort_by(field, reverse, primer){
        
        var key = primer ?
        function(x) {return primer(x[field])} :
        function(x) {return x[field]};
        
        reverse = !reverse ? 1 : -1;
        
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
    
    switch(value) {
        case "recent":
            return list.sort(sort_by("ChristianID",true));
        case "a-z":
            return list.sort(sort_by("Title",false));
        case "z-a":
            return list.sort(sort_by("Title",true));
        case "new":
            return list.sort(sort_by("Year",true));
        case "old":
            return list.sort(sort_by("Year",false));
        case "high":
            return list.sort(sort_by("imdbRating",true));
        case "low":
            return list.sort(sort_by("imdbRating",false));
        default:
            return list.sort(sort_by(value,r));
    }
}

function go() {
    $(".movie").show();
    loadMovies(mySort($("#sort").val()));
    byTitle($("#searchT").val());
    byActor($("#searchA").val());
    byGenre($("#genre").val());
    byRating($("#rating").val());
    $(".notice").text($(".movie:visible").length + " Movies Found");
}

function jQ_UI_Header(list=allMovies) {
    
    $("#go, #topbutton").button();
    $(".header select").selectmenu({ width:200 });
    
    var tTags = [];
    for (i in list) {
        tTags.push(list[i].Title);
    }
    $("#searchT").autocomplete({
                            source:tTags,
                            minLength: 3
                            });
    
    
    var aTags = uniqueList("Actors",list);
    for (i in list) {
        aTags.push(list[i].Title);
    }
    $("#searchA").autocomplete({
                            source:aTags,
                            minLength: 3
                            });
 
}

function uniqueList(topic,list = allMovies) {
    var uList = [];
    for (m in list) {
        uList += (list[m][topic]) + ", ";
    }
    uList = uList.split(", ");
    uList = jQuery.unique(uList);
    uList.pop("");
    return uList;
}

function scrollFn() {
    
    $("body").append("<div><button id='topbutton'>&uarr;&#128295;</button></div>");
    $("#topbutton").css({"position":"fixed",
                        "opacity":"0",
                        "right":"0"});
    
    $(document).scroll(function() {
                       
                       var percent = $(document).scrollTop() / ($(document).height() - $(window).height());
                       
                       if (percent<0.5) {
                       $("#topbutton").css({"top":percent*100+"%",
                                           "opacity":percent*5});
                       } else {
                       $("#topbutton").css({"top":"50%",
                                           "opacity":percent*5});
                       }
                       
                       });
}

function themeFn() {
<<<<<<< HEAD
    var themes = ["base-theme", "trontastic", "darkice", "shadowfire", "evilqueen", "swanky"];
=======
    var themes = ["base-theme", "trontastic", "darkice", "shadowfire"];
>>>>>>> parent of cb688a8... swanky and directory mgmt
    var curr = "";
    
    if (!localStorage.getItem("theme")) {
        curr = "base-theme";
        localStorage.setItem("theme",curr);
    } else {
        curr = localStorage.getItem("theme");
    }
    
    themes.splice(themes.indexOf(curr),1);
    themes.unshift(curr);

    $("body").append("<div class='ui-front theme'>" +
                     "<select id='theme'>" +
                     "</select>" +
                     "</div>");
    
    $("body *").addClass(localStorage.getItem("theme"));
    
    for (t in themes) {
        $("head").append("<link href='resources/jqueryUI/themes/" + themes[t] + ".min.css' rel='stylesheet'></link>");
        $("#theme").append("<option>" + themes[t] + "</option>");
    }
    
    $(".theme").css({"position":"fixed",
                    "top":"0",
                    "right":"0"});
    
    $(document).scroll(function() {
                       if ($(document).scrollTop() != 0) {
                       $(".theme").fadeOut(1000);
                       } else {
                       $(".theme").fadeIn(1000);
                       }
                       });
    
    $("#theme").on('selectmenuchange',function() {
                       changeTheme($("#theme").val());
                       });
    
    $("#theme").selectmenu();
}

function changeTheme(to, from) {
    var theme = from || localStorage.getItem("theme") || "base-theme";
    $("body *").removeClass(theme);
    $("body *").addClass(to);
    localStorage.setItem("theme",to);
}