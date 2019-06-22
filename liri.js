require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var songName = ""

//-----------Questions--------------
//Where do I get the axios package?
//I'm not using the spotify package? just slimply making a key and calling the spotify API? Or do I need the spotify package? How do I download it?

//For Loop to search for songs with multiple words in title.
for (var i=2; i < nodeArgs.length; i++){
    if(i > 2 && i < nodeArgs.length){
        songName = songName + "+" + nodeArgs[i];
    }
    else{
        songName = "The+Sign"
    }
}

var queryURL = "first part" + songName + "secondPart";

axios.get(queryURL).then(
    function(response){
        console.log(response);
    }
)
//Error
.catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });





//command to use: node liri.js spotify-this-song '<song name here>'
