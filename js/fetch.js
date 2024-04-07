/*
 * fetch.js
 * Retrieves all SSBM tournaments listed on start.gg that
 * take place in New York State
 */

function fetchTournamentData(page) {

    // Save dates into unix timestamps for today and one week from today
    let currentDateTimestamp = Math.floor(Date.now() / 1000);
    let oneWeekFromNowTimestamp = currentDateTimestamp + (7 * 24 * 60 * 60);

    // Retrieve data using start.gg graphQl query
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
                "page": page
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        tournamentList(data.data.tournaments.nodes);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

 // JavaScript to update the current year in the footer
 document.getElementById('current-year').textContent = new Date().getFullYear();