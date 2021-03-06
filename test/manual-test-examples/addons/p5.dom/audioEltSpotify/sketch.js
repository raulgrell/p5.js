/**
 *  Get an array of songs from Spotify API based on a search query.
 *
 *  Then, pick a random song, and change the src of an audio element
 *  to the "preview_url" of that song.
 *
 *  Note that we only need one audio element, but by changing its src,
 *  we can use it to play multiple sources.
 */

var songs = [];
var searchButton;
var playButton;
var queryField;
var audioPlayer;

function setup() {
  noCanvas();

  queryField = createInput();
  queryField.elt.placeholder = 'Enter a search term';
  searchButton = createButton('Search for songs');
  searchButton.mousePressed(findSongs);

  playButton = createButton('Play a new song');
  playButton.mousePressed(playRandomSong);
  playButton.hide();

  audioPlayer = createAudio();
}

// callback when search button is pressed.
function findSongs() {
  var searchTerm = queryField.value();
  loadJSON(
    'https://api.spotify.com/v1/search?q=' + searchTerm + '&type=track',
    gotSongs
  );
}

// callback from loadJSON
function gotSongs(data) {
  playButton.show();
  audioPlayer.showControls();
  songs = data.tracks.items;
}

// when playButton is pressed, pick a random song and play it
function playRandomSong() {
  var i = floor(random(songs.length));
  var songPreview = songs[i].preview_url;
  audioPlayer.src = songPreview;
  audioPlayer.play();
}
