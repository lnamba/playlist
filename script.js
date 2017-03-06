$(document).ready(function(){

  $.getJSON("https://lit-fortress-6467.herokuapp.com/object", function(data){
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
    $("#right").append("<div id='coverPhotoDiv'></div>"); //works
    // $("#tracks").append("<div id='coverPhotoDiv'></div>"); // does not work
    $("#coverPhotoDiv").css({"height":"100vh", "width":"100%", "position":"relative", "z-index": "0", "display":"block"});
    for (var k = 0; k < threeCovers.length; k++) {

      $("#coverPhotoDiv").append("<img id='cover" + (k+1) + "' src='images/" + threeCovers[k] + "'>");
      $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "display":"block", "margin":"0 auto", "position":"relative", "z-index":"2"});
      //$("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "position":"relative", "top":"50%", "left":"50%"});

      // $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "display":"block", "position":"absolute", "z-index":"2", "top":"40%", "left":"40%"});

    }

    // Playlist PAGE
    // Below gets the cover image from each object and displays
    // $("#album").append("<div id='allCoversDiv'></div>");
    // $("#allCoversDiv").css({"height":"20vh", "width":"70vw", "margin":"0px auto", "display":"inline-block"})
    // allCovers.map(function(l, ind){ //loop thru allCovers array of images and append
    //   $("#allCoversDiv").append(`<img id='playlistCover${ind+1}' src='images/${l}'>`);
    //   $(`#playlistCover${ind+1}`).css({"height":"100px", "width":"100px", "margin":"55px 40px 0 0", "display":"inline-block"});
    // },0)
    // $("#allCoversDiv").children().click(function(){
    //   console.log($(this));
    //   // $(this).
    // })

    $("#album").append("<div id='allCoversDiv'></div>");
    $("#allCoversDiv").css({"height":"20vh", "width":"70vw", "margin":"0px auto", "display":"inline-block"})
    data.results.map(function(l, ind){ //loop thru allCovers array of images and append
      $("#allCoversDiv").append(`<img id='playlistCover${ind+1}' src='images/${l.cover_art}'>`);
      $(`#playlistCover${ind+1}`).css({"height":"100px", "width":"100px", "margin":"55px 40px 0 0", "display":"inline-block"});
      console.log(l.cover_art);
    },0);

    // prints each name and album to bin
    $("#allCoversDiv").children().click(function(){
      var srcAttr = $(this).attr("src");
      data.results.map(function(m, ind){
        if (srcAttr === "images/"+m.cover_art) {
          $("#bin").append(`<li class='binLI'>${m.artist}: ${m.title}</li>`);
        }
      })
      $(".binLI").css({"margin":"10px 0 0 20px", "list-style-type":"none"});
    });

    // clears the bin
    $("#clear").on("click", function(){
      $("#bin").empty("li");
    });


  });


  // var opt = {
  //   method: "GET",
  //   mode: "cors"
  // }
  //
  // fetch("https://lit-fortress-6467.herokuapp.com/object", opt)
  //   .then(function(response) {
  //     return response.json();
  //   }).then(function(data) {
  //     console.log(data.results);
  //     var allCovers = [];
  //     var threeCovers = [];
  //     for(var i = 0; i < data.results.length; i++) {
  //       allCovers.push(data.results[i].cover_art);
  //     }
  //     var j = 0;
  //     while(threeCovers.length < 3) { //why does this work
  //       var randomArt = Math.floor(Math.random() * data.results.length);
  //       if (threeCovers.indexOf(allCovers[randomArt]) === -1) {
  //         threeCovers.push(allCovers[randomArt]);
  //       }
  //       j++;
  //     }
  //     console.log(threeCovers);
  //     // $("#right").append('<img id="tracks" src="resources/track.jpg" alt="Train Tracks">');
  //     $("#right").append("<div id='coverPhotoDiv'></div>"); //works
  //     // $("#tracks").append("<div id='coverPhotoDiv'></div>"); // does not work
  //     // $("#tracks").css({"z-index":"1", "position":"relative", "white-space":"nowrap"});
  //     $("#coverPhotoDiv").css({"height":"100vh", "width":"100%", "position":"relative", "z-index": "0", "display":"block"});
  //     for (var k = 0; k < threeCovers.length; k++) {
  //
  //       $("#coverPhotoDiv").append("<img id='cover" + (k+1) + "' src='images/" + threeCovers[k] + "'>");
  //       $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "display":"block", "margin":"0 auto", "position":"relative", "z-index":"2"});
  //       //$("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "position":"relative", "top":"50%", "left":"50%"});
  //
  //       // $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "display":"block", "position":"absolute", "z-index":"2", "top":"40%", "left":"40%"});
  //
  //     }
  //
  //     // Playlist PAGE
  //     // Below gets the cover image from each object and displays
  //     $("#album").append("<div id='allCoversDiv'></div>");
  //     $("#allCoversDiv").css({"height":"20vh", "width":"70vw", "margin":"0px auto", "display":"inline-block"})
  //     allCovers.map(function(l, ind){ //loop thru allCovers array of images and append
  //       $("#allCoversDiv").append(`<img id='playlistCover${ind+1}' src='images/${l}'>`);
  //       $(`#playlistCover${ind+1}`).css({"height":"100px", "width":"100px", "margin":"55px 40px 0 0", "display":"inline-block"});
  //     },0)
  //     // $("#allCoversDiv").children().click(function(){
  //     //   $(this).
  //     // })
  //
  //     data.results.map(function(m, ind){
  //       console.log(m);
  //     });
  //
  //
  //   });

  // fetch("https://lit-fortress-6467.herokuapp.com/object")
  //   .then(function(response){
  //     return response.json();
  //   }).then(function(data){
  //     console.log(data.results);
  //     var allCovers = [];
  //     var threeCovers = [];
  //     for(var i = 0; i < data.results.length; i++) {
  //       allCovers.push(data.results[i].cover_art);
  //     }
  //     var j = 0;
  //     while(threeCovers.length < 3) { //why does this work
  //       var randomArt = Math.floor(Math.random() * data.results.length);
  //       if (threeCovers.indexOf(allCovers[randomArt]) === -1) {
  //         threeCovers.push(allCovers[randomArt]);
  //       }
  //       j++;
  //     }
  //     console.log(threeCovers);
  //     $("#right").append('<img id="tracks" src="resources/track.jpg" alt="Train Tracks">');
  //     // $("#right").append("<div id='coverPhotoDiv'></div>"); //works
  //     $("#tracks").append("<div id='coverPhotoDiv'></div>"); // does not work
  //     $("#coverPhotoDiv").css({"height":"100vh", "width":"100%", "position":"relative", "z-index": "0", "display":"block"});
  //     for (var k = 0; k < threeCovers.length; k++) {
  //
  //       $("#coverPhotoDiv").append("<img id='cover" + (k+1) + "' src='images/" + threeCovers[k] + "'>");
  //       $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "display":"block", "margin":"0 auto", "position":"relative", "z-index":"1"});
  //       //$("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "position":"relative", "top":"50%", "left":"50%"});
  //
  //       // $("#cover"+(k+1)).css({"height":"230px", "width":"230px", "margin":"0 auto", "display":"block", "position":"absolute", "z-index":"2", "top":"40%", "left":"40%"});
  //     }
  //   });
  //
  //     // $("#choose_tracks_button").on("click", function(){
  //     //
  //     // });

});
