require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var nodeArgv = process.argv;

var artist = "";
var songName = "";
var movieName = "";

//Tasks to complete:
//Moment.js for date on concert-this


//Multiple words
var title = "";
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        title = title + " " + nodeArgv[i];
    } else {
        title = title + nodeArgv[i];
    }
};

function runTask() {
    switch (command) {
        case 'concert-this':
            concertThis(title);
            break;
        case 'spotify-this':
            if (title === "") {
                title = "Miss Grace";
            }
            spotifyThis(title);
            break;
        case 'movie-this':
            movieThis(title);
            break;
        case 'do-what-it-says':
            readFile();
            break;
    }
}

//concert This Command
function concertThis(title) {
    artist = title;

    //Query Search
    console.log("Artist: " + artist);
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
            function (response) {
                //console.log(response.data);
                console.log("Name of Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city);
                console.log("Date of the Event: " + response.data[i].datetime);
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
function spotifyThis(title) {
    songName = title;

    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occured: ', err)
        };
        var results = data.tracks.items
        for (i = 0; i < results.length; i++) {
            console.log("Artist:" + results[i].artists[0].name);
            console.log("Song's Name: " + results[i].name);
            console.log("Spotify Song Link: " + results[i].external_urls.spotify)
            console.log("Album Name: " + results[i].album.name);
        }
    })
}

//movie-this command
function movieThis(title) {
    movieName = title;
    console.log("movie name: " + movieName)

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
            function (response) {
                console.log(response);
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                //              console.log("Rotten Tomatos Rating: " + response.data.tomatoRating );
                console.log("Country Produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
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

runTask()

//do what it says command
function readFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);

        if (dataArr[0] === "movie-this") {
            movieThis(dataArr[1])
        }

    })
}