var weatherApiRootUrl = "https://api.openweathermap.org";
var searchHistory = [];
var weatherApiKey = 'a84dbc438bb69e52f6ee08f2039489b3';
var searchInput = document.querySelector('#search-input')
var searchForm = document.querySelector('#search-form')

// DAYSjs is a library similar to momentjs 
//cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format('M/D/YYYY')

function fetchWeather(location){
    var {lat} = location;
    var {lon} = location;
    var city = location.name;
    var apiUrl = "${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}"

    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    }) .then(function (data) {
        renderItems(city, data)
    }).catch(function (err) {
        console.error(err)
    })
}

function fetchCoords(search) {
    var apiUrl = "${weatherApiRootUrl}/geo/1.0/direct?q={search}&limit=5&appid=${weatherApiKey}"

    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    }).then(function(data) {
        if(!date[0]) {
            alert("can't find a location") 
        } else {
        appendToHistory(search);
        fetchWeather(data[0])
    }
    }).catch(function (err) {
        console.error(err)
    });
}


function handleSearchClick(a) {
  a.preventDefault();
  var search = searchInput.value.trim()
  fetchCoords(search)
  searchInput.value = ' ';
}


//initializeSearch();
searchForm.addEventListener('submit', handleSearchClick);
