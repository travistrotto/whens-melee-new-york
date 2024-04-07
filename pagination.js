let currentPage = 1; // Variable to keep track of current page

function nextPage() {
    currentPage++; // Increment the page number
    fetchTournamentData(currentPage); // Fetch data for the next page
}