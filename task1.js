// array that will be used to store user input
let art = [];

// will be used in the appendChild method
let body = document.getElementById("body")

function onLoad() {
  let clear = document.getElementById("clear")
  // create the clear all button
  let clrButton = document.createElement('button')
  clrButton.innerHTML = "Clear All"
  clrButton.style.backgroundColor = "#800080"
  clrButton.style.color = "white"
  

  // EventListener will trigger if click on button
  clrButton.addEventListener('click', function clrAll() {
    // clear the localStorage
    localStorage.clear()
  });

  // position the clear all button
  clrButton.style.display = "block"
  clrButton.style.marginTop = "5px"

  // add button to HTML document
  clear.appendChild(clrButton)
}

// constructor function, is an object [property, value]
function Artist(song, artist, album, release_date, genre) {
  this.song = song
  this.artist = artist;
  this.album = album;
  this.release_date = release_date;
  this.genre = genre; 
}

// function to get user input values
function addArtist() {
  let newArtist= new Artist(
    document.getElementById("song").value,
    document.getElementById("artist").value,
    document.getElementById("album").value,
    document.getElementById("year").value,
    document.getElementById("genre").value
  );
  // push new data to the back of the array    
  art.push(newArtist);
  // add the songData property to localStorage, instead of using setItem
  localStorage.songData = JSON.stringify(art);
}

// check if localStorage contains any data, if true, there's already stored data in localStorage
if (localStorage.songData) {
  // songData instead of using getItem
  art = JSON.parse(localStorage.songData)

  console.log(art)
  // the in keyword, loops through each key in the art array
  for (let i in art) {
    // therefore, creating a <tr> for each object in the art array
    let table_row = document.createElement('tr')
    // create a button to delete a song
    let dltButton = document.createElement('button')
    dltButton.innerHTML = "Delete"
    dltButton.style.backgroundColor = "#800080"
    dltButton.style.color = "white"
    // EventListener will trigger if click on button
    dltButton.addEventListener('click', function dltSong() {
      // splice(i) will delete the selected song
      art.splice(i, 1)
      localStorage.songData = JSON.stringify(art);
    });
      /* within each object, do the following: 
      [key, value] = placeholder variables, i refers to the spesific object in the array */
      for (let [key, value] of Object.entries(art[i])) {
        // create a <th> for each value in the object, within the art array
        var div = document.createElement('th')
        // data in the <th> is now editable
        div.contentEditable = "true";
        // value = the value of each property in the object
        div.innerHTML = value;
        // when there's a change in the data in the <input> element, this function is called
        div.oninput = function(e) {
          // change the value of the key affected
          art[i][key] = e.target.innerText
          localStorage.songData = JSON.stringify(art);
        }

        // style the table
        div.style.margin = "10%";
        div.style.border = "2px solid #800080";
        div.style.textAlign = "center";
        div.style.padding = "10px";

        table_row.appendChild(div)
      }
    body.appendChild(table_row)
    body.appendChild(dltButton)
  }
}
