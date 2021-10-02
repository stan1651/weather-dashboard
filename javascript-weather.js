var weatherApiKey = "a84dbc438bb69e52f6ee08f2039489b3";
var searchHistory = [];
var form = $("#search-form");
var searchInput = $("#weatherSearch");
var resultsContainer = $("#results");
var searchHistoryContainer = $("#search-history");

searchHistory = 
localStorage.getItem("search-history");
if (searchHistory) {
    searchHistory = 
    JSON.parse(searchHistory);
} else {
    searchHistory = [];
}

function handleFormSubmit(event) {
    event.preventDefault();
    var query = searchInput.val().trim();
    if (query) {
        searchOpenWeather(query);
        searchInput.val("");
        addSearchToHistory(query);
    }
    function displayButtons() {
        searchHistoryContainer.empty();
        for (var i = searchHistory.length - 1; i >= 0; i--) {
            var button = $("<button>")
            .attr({
                type: "button",
                class:"btn btn-info btn-block"
            })
            .text(searchHistory[i]);
            searchHistoryContainer.append(button);
        }
    }
    function handleSearchClick() {
        searchOpenWeatherMap(this.textContent)
    }
}
function addSearchToHistory(query) {
    searchHistory.push(query);
    localStorage.setItem("search-history",
    JSON.stringify(searchHistory));
    displayButtons();
}
form.on("submit", handleFormSubmit);
searchHistoryContainer.on("click", ".btn-seach", handleSearchClick);
displayButtons();