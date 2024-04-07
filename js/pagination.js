/*
 * pagination.js
 * Handles which tournaments are displayed on the screen
 */

let currentPage = 1;

// Listen for button click
document.addEventListener("DOMContentLoaded", function () {
    fetchTournamentData(currentPage);
    document.getElementById('next-page-btn').addEventListener('click', nextPage);
});
 
// Display next page
function nextPage() {
    currentPage++;
    fetchTournamentData(currentPage);
}