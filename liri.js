require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var nodeArgs = process.argv;
var songName = "";
var movieName = "";
var artist = "";

//-----------Questions--------------

//concert This Command
if (process.argv[2] == "concert-this") {
    //For Loop to search for songs with multiple words in title.
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i >= 3 && i < nodeArgs.length) {
            artist = artist +  "+" + nodeArgs[i];
        } else {
            artist = ""
        }
    }
    //Query Search
    console.log("Artist: " + artist);
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
            function (response) {
                console.log(response);
                console.log("Name of Venue: ");
                console.log("Venue Location: ");
                console.log("Date of the Event: ");
            })
        .catch(function (error) {
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
}

//spotify This Song Command
else if (process.argv[2] == "spotify-this-song") {
    //For Loop to search for songs with multiple words in title.
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i >= 3 && i < nodeArgs.length) {
            songName = songName + nodeArgs[i];
        } else {
            songName = "The Sign"
        }
    }
    spotify.search({
            type: 'track',
            query: songName
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//movie-this command
else if (process.argv[2] == "movie-this") {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i >= 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += "Mr+Nobody"
        }
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
            function (response) {
                console.log(response);
                console.log("Title: ");
                console.log("Release Year: ");
                console.log("IMDB Rating: ");
                console.log("Rotten Tomatos Rating: ");
                console.log("Country Produced: ");
                console.log("Language: ");
                console.log("Plot: ");
                console.log("Actors: ");
            })
        .catch(function (error) {
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

}

//do what it says command
else if (process.argv[2] == "do-what-it-says") {
    console.log("Do What It Says Activated")
}

//If none of the commands work...
else {
    console.log("Please check your command (Index 1)");
};