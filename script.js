$( function() {
  $( "#dialog" ).dialog({
dialogClass: "no-close",
width: "auto",
minHeight: 0,
autoOpen: false,
});
} );
var cooks = document.cookie;
if (cooks == "") {
  $( document ).ready(function() {
$( "#dialog" ).dialog( "open" );
  });

}
var datum;

function handleFileSelect(evt) {
$( "#dialog" ).dialog( "close" );
  var file = evt.target.files[0];
  //document.cookie = "direct=" + file;

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      datum = results;
console.log(datum);

  Object.keys(datum.data).forEach(key => {
      movie = (datum.data[key].movie);

      place = (datum.data[key].place);
      var list = document.getElementById('myUL');
      var entry = document.createElement('li');
list.appendChild(entry);
var link = entry.appendChild(document.createElement("a"));
link.href = "#revealPanel";
link.className = "ui-link affector";
var clickVal = "changer(\"" + movie + "///" + place + "\");";
$(link).attr('onclick', clickVal);
/*link.addEventListener('click', function(){
document.getElementById('MovieT').innerHTML = movie});*/
var table = link.appendChild(document.createElement("table"));
table.style.width = "100%";
var tr = table.appendChild(document.createElement("tr"));
var tdL = tr.appendChild(document.createElement("td"));
//var tdM = tr.appendChild(document.createElement("td"));
var tdR = tr.appendChild(document.createElement("td"));
tdL.className = "leftT";
tdR.className = "rightT";
tdL.innerHTML = movie;
tdR.innerHTML = place;
/*tdM.innerHTML = "MID";
tdM.className = "middleT";
tdM.innerHTML = document.getElementById('MovieG').innerHTML;*/
    });

    }
  });
}

$(document).ready(function(){
  $("#csv-file").change(handleFileSelect);
});
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function changer(val) {
  var infArr = val.split("///");
  var movieName = infArr[0];
  var placeLoc = infArr[1];
  var mTitle = document.getElementById('MovieT');
  var mLoc = document.getElementById('MovieLoc');
  var mImg = document.getElementById('MovieI');
  var mOver = document.getElementById('MovieO');
  var mRun = document.getElementById('MovieR');
  var mGen = document.getElementById('MovieG');
  mLoc.innerHTML = placeLoc;
  $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=f8da9d8cd264c51de25d92cf45fc3217&query=" + encodeURI(movieName), function(data) {
var apiId = data.results["0"].id;
      $.getJSON("https://api.themoviedb.org/3/movie/" + apiId + "?api_key=f8da9d8cd264c51de25d92cf45fc3217&language=en-US", function(data2) {
console.log(data2);
mTitle.innerHTML = data2.title;
mOver.innerHTML = data2.overview;
mRun.innerHTML = (data2.runtime) + " minutes";
mImg.src = "https://image.tmdb.org/t/p/w200" + data2.poster_path;
var mWeb = document.getElementById("MovieW");
mWeb.href = data2.homepage;
var mWebI = document.getElementById("MovieWI");
mWebI.href = "https://www.imdb.com/title/" + data2.imdb_id;
if (data2.adult) {
mTitle.innerHTML += " &#9888;";
$(mTitle).attr('title', "ADULT WARNING!");
}
for (i = 0; i <= (data2.genres.length - 1); i++) {
for (i = 0; (i + 1) <= data2.genres.length; i++) {
 if (i == 0) {
   mGen.innerHTML = data2.genres[i].name;
 } else {
   mGen.innerHTML += ", " + data2.genres[i].name;
 }
}
}
$.getJSON("https://api.themoviedb.org/3/movie/" + apiId + "/credits?api_key=f8da9d8cd264c51de25d92cf45fc3217", function(data3) {
  console.log(data3);
var mCast = document.getElementById('MovieC');
  for (i = 0; i <= (data3.cast.length - 1); i++) {
    if (i == 0) {
      mCast.innerHTML = "<strong>Cast: </strong>" + data3.cast[i].name;
    } else {
      mCast.innerHTML += ", " + data3.cast[i].name;
    }
  }
})
      });
  });
}
