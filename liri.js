var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require('./keys.js');
var spot;
var yes;
var fly;
var walk;
var movies;
var dataArr;
var add = " ";
var js = process.argv;
for (var i = 3; i < js.length; i++) {

  add = add + " " + js[i];

}

// tweets function
function tweets() {

  if (js[2] === "my-tweets") {

    var client = new Twitter(keys);
    // console.log(client);

    var params = {
      screen_name: 'daveliri',
      count: 8
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (i = 0; i < 8; i++)

          console.log(tweets[i].text);
        console.log("-----------------------");
      }
    });
  }
}
//  spotify function

function spotify() {
  if (js[2] === "spotify-this-song") {
    js[2] = yes;
    if (add === undefined) {
      spot = "Error";
    } else {
      spot = add;
    }

    var spotify = new Spotify({
      id: 'e80c751fe56d4e06af6e634e0d666890',
      secret: 'c59b540777404cceae19104c026ffaa1'
    });

    spotify.search({
      type: 'track',
      query: spot
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-----------------------");
      }
    });

  }
}
// movie function
function movie() {

  if (js[2] === "movie-this") {
    if (add === undefined) {
      movies = "Mr. Nobody";
    } else {
      add = movies;
    }
    var url = request("http://www.omdbapi.com/?t=" + movies + "&y=&plot=long&tomatoes=true&r==json&y=&plot=short&apikey=40e9cece",
      function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

          console.log("Title of the movie: " + JSON.parse(body).Title);
          console.log("Year of the movie came out: " + JSON.parse(body).Year);
          console.log("IMDB Rating: " + JSON.parse(body).imdbrating);
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
          console.log("Country where the movie was produced: " + JSON.parse(body).Country);
          console.log("Language of the movie: " + JSON.parse(body).Language);
          console.log("Plot of the movie: " + JSON.parse(body).Plot);
          console.log("Actors in the move: " + JSON.parse(body).Actors);
          console.log("-----------------------");

        }
      });
  }
}
// reading a text file
function run() {

  if (js[2] === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      } else {

        // Then split it by commas (to make it more readable)
        dataArr = data.split(",");

        for (i = 0; i < dataArr; i++)

          js[2] = dataArr[0];
          js[2] =yes;
        add = dataArr[1];

        var spotify = new Spotify({
          id: 'e80c751fe56d4e06af6e634e0d666890',
          secret: 'c59b540777404cceae19104c026ffaa1'
        });

        spotify.search({
          type: 'track',
          query: add
        }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } else {
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("-----------------------");
          }
        });

      }
    });
  }
}
tweets();
spotify();
movie();
run ();
