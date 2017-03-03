$(document).ready(function(){

  fetch("https://lit-fortress-6467.herokuapp.com/object")
    .then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data.results);
      var allCovers = [];
      var threeCovers = [];
      for(var i = 0; i < data.results.length; i++) {
        allCovers.push(data.results[i].cover_art);
      }
      var j = 0;
      while(threeCovers.length < 3) { //why does this work
        var randomArt = Math.floor(Math.random() * data.results.length);
        if (threeCovers.indexOf(allCovers[randomArt]) === -1) {
          threeCovers.push(allCovers[randomArt]);
        }
        j++;
      }
      console.log(threeCovers);
      $("#right").append('<img id="tracks" src="resources/track.jpg" alt="Train Tracks">');
      // $("#right").append("<div id='coverPhotoDiv'></div>"); //works
      $("#tracks").append("<div id='coverPhotoDiv'></div>"); // does not work
      $("#coverPhotoDiv").css({"height":"100vh", "width":"100%", "position":"relative", "z-index": "0", "display":"block"});
      for (var k = 0; k < threeCovers.length; k++) {

        $("#coverPhotoDiv").append("<img id='cover" + (k+1) + "' src='images/" + threeCovers[k] + "'>");
        $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "display":"block", "margin":"0 auto", "position":"relative", "z-index":"1"});
        //$("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "position":"relative", "top":"50%", "left":"50%"});

        // $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "display":"block", "position":"absolute", "z-index":"2", "top":"40%", "left":"40%"});
      }
    });

      // $("#choose_tracks_button").on("click", function(){
      //
      // });

});
