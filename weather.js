var weatherApiRootUrl = "https://api.openweathermap.org";
var searchHistory = [];
var weatherApiKey = 'a84dbc438bb69e52f6ee08f2039489b3';
var searchInput = document.querySelector('#search-input')
var searchForm = document.querySelector('#search-form')

// DAYSjs is a library similar to momentjs 
cardTitle.textContent = dayjs.unix(unixTs).tz(timezone).format('M/D/YYYY')
searchHistory = localStorage.getItem("search-history");
if (searchHistory) {
  searchHistory = JSON.parse(searchHistory);
} else {
  searchHistory = [];
}

function fetchWeather(location){
    var {lat} = location;
    var {lon} = location;
    var city = location.name;
    var apiUrl =`${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`

    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    }) .then(function (data) {
        renderItems(city, data)
    }).catch(function (err) {
        console.error(err)
    })
}

function fetchCoords (search) {
    var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q={search}&limit=5&appid=${weatherApiKey}`

    fetch(apiUrl)
    .then(function (res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
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

  
function displayButtons() {
    searchHistoryContainer.empty();
    for (var i = searchHistory.length - 1; i >= 0; i--) {
      var button = $("<button>")
        .attr({
          type: "button",
          class: "btn btn-info btn-block",
        })
        .text(searchHistory[i]);
      searchHistoryContainer.append(button);
    }
  }

function handleSearchClick(a) {
  a.preventDefault();
  var search = searchInput.value.trim()
  fetchCoords(search)
  searchInput.value = ' ';
  addSearchToHistory(query);
}
function addSearchToHistory(query) {
  initLocalStorage();
    searchHistory.push(query);
    localStorage.setItem("search-history",
    JSON.stringify(searchHistory));
    displayButtons();
}

initializeSearch();
searchForm.addEventListener('submit', handleSearchClick);
