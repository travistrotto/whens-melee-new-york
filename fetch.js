document.addEventListener("DOMContentLoaded", function () {
    fetchTournamentData(currentPage); // Fetch data for the initial page
    document.getElementById('next-page-btn').addEventListener('click', nextPage); // Listen for button click
});

function fetchTournamentData(page) {
    // Calculate today's date in Unix timestamp format
    let currentDateTimestamp = Math.floor(Date.now() / 1000); // Divide by 1000 to get seconds instead of milliseconds

    // Calculate timestamp for one week from today
    let oneWeekFromNowTimestamp = currentDateTimestamp + (7 * 24 * 60 * 60);

    fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer cdb7c3c94d71bc940d01700f9ddcaa5a'
        },
        body: JSON.stringify({
            "query": "query queryLocals($perPage: Int, $state: String!, $page: Int!) {tournaments(query: {perPage: $perPage page: $page filter: {upcoming: false videogameIds: [1] afterDate: " + currentDateTimestamp + " beforeDate: " + oneWeekFromNowTimestamp + " addrState: $state } }) {nodes {id name slug events(filter: {videogameId:1}) {id name startAt numEntrants } } } }",
            "variables": {
                "perPage": 10,
                "state": "NY",
                "page": page // Include the page variable in the API call
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            displayTournaments(data.data.tournaments.nodes);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}