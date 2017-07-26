// fs is a core Node package for reading and writing files
var fs = require("fs");


//take in the method that the user wants to do
var request = process.argv[2];
console.log(request);
//variable smo for song or movie
var smo = "";
for (var l = 3; l < process.argv.length; l++){
  smo += process.argv[l] + " ";
}


//make it so liri can take in my-tweets  (this shows the last 20 tweets and
// when they were created)
var Twitter = require ("twitter");
var client = new Twitter ({
  consumer_key: "EfNmvKGfUV1662Hco2GUY7RGs",
  consumer_secret: "PpDV4D2FNfqeJihpzMka03xRz0LWTeJzTDuwzZTWXaqpNX9U1N",
  access_token_key: "78752942-xAZNSp0P302IGD42vHHuWlMkIvwk9FQxmfilKaWaz",
  access_token_secret: "H9IoClwKT7E55lis4gtf27yCWNAraDgQeAlaAu8EadSqD"
});

//spotify api stuff
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
  id: "ffa6eebace784384b7f358168457a38b",
  secret: "34ef9c4b717c485f8991d626bfc4f850"
});

//for request package
var equest = require ("request");

var dodashiz = function(){
//switch case for all the commands to take
switch(request) {
  //twitter command
  case ("my-tweets"):

    //show last 20 tweets
    var params = { screen_name: "simegatran"};
    client.get("statuses/user_timeline", params, function(error, tweets, response){
      if (!error){
        for (var i =0; i < 20; i ++){
          console.log(tweets[i].text);
        }
      }
    });
  break;

  //spotify-this-song command
  case("spotify-this-song"):

    //get the artist name
    spotify.search({ type: "track", query: smo, limit: 1},
                  function(err,data){
      if (err){
        console.log(err);
      }

      var artist = data.tracks.items[0].album.artists[0].name;

      //get the song
      var song = data.tracks.items[0].name;

      //get preview link from Spotify
      var preview = data.tracks.items[0].external_urls.spotify;

      //the album that the song is from
      var album = data.tracks.items[0].album.name;

      console.log("Artist: " + artist);
      console.log("Song: " + song);
      console.log("Preview link: " + preview);
      console.log("Album name: " + album);
  });
      break;

    //for movie
    case ("movie-this"):

    if (smo !== ""){
      var url = "http://www.omdbapi.com/?apikey=40e9cece&t=" + smo;

      equest(url, function(error, response, body) {

       // If the request is successful
       if (!error && response.statusCode === 200 ) {

         var data = JSON.parse(body);

         //year of movie
         var year = data.Year;

         //title of movie
         var title = data.Title;

         //rating (imdb)
         var imdb = data.imdbRating;

         //rotten tomatoes rating
         var rotten = data.Ratings[1].Value;

         //country
         var country = data.Country;

         //language
         var language = data.Language;

         //plot
         var plot = data.Plot;

         //actors
         var actors = data.Actors;

         console.log("Movie: " + title);
         console.log("Year: " + year);
         console.log("Imdb Rating: " + imdb);
         console.log("Rotten tomatoes Rating: " + rotten);
         console.log("Country: " + country);
         console.log("Language: " + language);
         console.log("Actors: " + actors);
       }

     });
   }
   else {
     var yurl = "http://www.omdbapi.com/?apikey=40e9cece&t=Mr.+Nobody";

     equest(yurl, function(error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200 ) {

        var data = JSON.parse(body);

        //year of movie
        var year = data.Year;

        //title of movie
        var title = data.Title;

        //rating (imdb)
        var imdb = data.imdbRating;

        //rotten tomatoes rating
        var rotten = data.Ratings[1].Value;

        //country
        var country = data.Country;

        //language
        var language = data.Language;

        //plot
        var plot = data.Plot;

        //actors
        var actors = data.Actors;

        console.log("Movie: " + title);
        console.log("Year: " + year);
        console.log("Imdb Rating: " + imdb);
        console.log("Rotten tomatoes Rating: " + rotten);
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Actors: " + actors);
      }

    });
   }
     break;

    //for do-what-it-says
    case ("do-what-it-says"):

      fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        request = dataArr[0];

        for (var k = 1; k < dataArr.length; k++){
          smo += dataArr[k];
        }

        dodashiz();
      });

      break;
   }
 };
 dodashiz();
