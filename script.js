$(document).ready(function(){
  var binContentsForSubmit = [];

  // get request gets data
  $.getJSON("https://lit-fortress-6467.herokuapp.com/object", function(data){
    console.log(data.results);
    var allCovers = [];
    var threeCovers = [];
    data.results.map(function(i){ // push cover images to array
      allCovers.push(i.cover_art);
    });
    var j = 0;
    while(threeCovers.length < 3) { // create an array of three random covers
      var randomArt = Math.floor(Math.random() * data.results.length);
      if (threeCovers.indexOf(allCovers[randomArt]) === -1) {
        threeCovers.push(allCovers[randomArt]);
      }
      j++;
    }
    console.log(threeCovers);
    // create a new div and append all covers on it
    // $("#right").append($("#coverPhotoDiv"));
    $("#coverPhotoDiv").css({"display":"block", "margin":"0px auto", "z-index":"2", "position":"absolute", "right":"16%"});
    threeCovers.map(function(k, ind){
      $("#coverPhotoDiv").append(`<img id='cover${ind+1}' src='images/${k}'>`);
      $(`#cover${ind+1}`).css({"height":"220px", "width":"220px", "display":"block", "margin":"10px auto 10px auto"});
    });

    // appends all cover images obtained thru GET request to allCoversDiv then appends that to album div
    $("#album").append("<div id='allCoversDiv'></div>");
    $("#allCoversDiv").css({"height":"90%", "width":"80vw", "margin":"0px auto", "display":"block", "overflow-x":"auto", "white-space":"nowrap"});
    data.results.map(function(l, ind){ //loop thru allCovers array of images and append
      $("#allCoversDiv").append(`<img id='playlistCover${ind+1}' src='images/${l.cover_art}'>`);
      $(`#playlistCover${ind+1}`).css({"height":"80%", "width":"20%", "margin":"20px 2% 20px 2%", "display":"inline-block"});
    },0);

    // prints each name and album to bin
    $("#allCoversDiv").children().click(function(){
      var srcAttr = $(this).attr("src");
      data.results.map(function(m, ind){
        if (srcAttr === "images/"+m.cover_art) {
          if (binContentsForSubmit.indexOf(`${m.artist}: ${m.title}`) === -1){
            $("#bin").append(`<li class='binLI'>${m.artist}: ${m.title}</li>`);
            binContentsForSubmit.push(`${m.artist}: ${m.title}`);
          } else{
            console.log("Already in the array");
          }
        }
      });
      $(".binLI").css({"margin":"10px 0 0 20px", "list-style-type":"none"});
    });

    // on submit button click, sends POST request, clears lis from bin and appends submitted message
    $("#submit").on("click", function(){
      console.log(binContentsForSubmit);
      $.post("https://lit-fortress-6467.herokuapp.com/post", function(data){
        console.log(data);
      });
      $("#bin").empty("li");
      $("#bin").append("<p id='submitMessage'>Bin submitted. Thank you.</p>");
      $("#submitMessage").css({"margin":"10px 0 0 20px"})
    })

    // clears the bin
    $("#clear").on("click", function(){
      $("#bin").empty("li");
      binContentsForSubmit = [];
    });


  });
    });

//Stretch code to make my playlist work
  // // get request gets data
  // $.getJSON("./db.json", function(data){
  //   console.log(data.results);
  //   var allCovers = [];
  //   var threeCovers = [];
  //   data.results.map(function(i){ // push cover images to array
  //     allCovers.push(i.cover_art);
  //   });
  //   var j = 0;
  //   while(threeCovers.length < 3) { // create an array of three random covers
  //     var randomArt = Math.floor(Math.random() * data.results.length);
  //     if (threeCovers.indexOf(allCovers[randomArt]) === -1) {
  //       threeCovers.push(allCovers[randomArt]);
  //     }
  //     j++;
  //   }
  //   console.log(threeCovers);
  //   // create a new div and append all covers on it
  //   $("#right").append("<div id='coverPhotoDiv'></div>");
  //   $("#coverPhotoDiv").css({"height":"100vh", "width":"30vw", "display":"block", "margin":"0px auto", "position":"absolute", "left":"60%"});
  //   $("#main").append($("#coverPhotoDiv"));
  //   threeCovers.map(function(k, ind){
  //     $("#coverPhotoDiv").append(`<img id='cover${ind+1}' src='${k}'>`);
  //     $(`#cover${ind+1}`).css({"height":"220px", "width":"220px", "display":"block", "margin":"10px auto 10px auto"});
  //   });
  //
  //   // appends all cover stretch_images obtained thru GET request to allCoversDiv then appends that to album div
  //   $("#album").append("<div id='allCoversDiv'></div>");
  //   $("#allCoversDiv").css({"height":"30vh", "width":"80vw", "margin":"0px auto", "display":"block", "overflow-x":"auto", "white-space":"nowrap"});
  //   data.results.map(function(l, ind){ //loop thru allCovers array of stretch_images and append
  //     $("#allCoversDiv").append(`<img id='playlistCover${ind+1}' src='${l.cover_art}'>`);
  //     $(`#playlistCover${ind+1}`).css({"height":"150px", "width":"150px", "margin":"30px 2% 0 2%", "display":"inline-block"});
  //   },0);
  //
  //   // prints each name and album to bin
  //   $("#allCoversDiv").children().click(function(){
  //     var srcAttr = $(this).attr("src");
  //     data.results.map(function(m, ind){
  //       if (srcAttr === "stretch_images/"+m.cover_art) {
  //         if (binContentsForSubmit.indexOf(`${m.artist}: ${m.title}`) === -1){
  //           $("#bin").append(`<li class='binLI'>${m.artist}: ${m.title}</li>`);
  //           binContentsForSubmit.push(`${m.artist}: ${m.title}`);
  //         } else {
  //           console.log("Already in the array");
  //         }
  //       }
  //     });
  //     $(".binLI").css({"margin":"10px 0 0 20px", "list-style-type":"none"});
  //   });
  //
  //   // on submit button click, sends POST request, clears lis from bin and appends submitted message
  //   $("#submit").on("click", function(){
  //     console.log(binContentsForSubmit);
  //     $.post("https://lit-fortress-6467.herokuapp.com/post", function(data){
  //       console.log(data);
  //     });
  //     $("#bin").empty("li");
  //     $("#bin").append("<p id='submitMessage'>Bin submitted. Thank you.</p>");
  //     $("#submitMessage").css({"margin":"10px 0 0 20px"})
  //   })
  //
  //   // clears the bin
  //   $("#clear").on("click", function(){
  //     $("#bin").empty("li");
  //     binContentsForSubmit = [];
  //   });
  //
  //
  // });
