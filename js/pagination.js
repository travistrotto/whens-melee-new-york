/*
 * pagination.js
 * Handles which tournaments are displayed on the screen
 */

let currentPage = 1;
let showingCurrentWeek = false; // Changed to false initially
let currentDateTimestamp = Math.floor(Date.now() / 1000);
let oneWeekFromNowTimestamp = currentDateTimestamp + (7 * 24 * 60 * 60);
let twoWeeksFromNowTimestamp = oneWeekFromNowTimestamp + (7 * 24 * 60 * 60);

// On  page load, display current week's tournaments page
document.addEventListener("DOMContentLoaded", function () {
    fetchTournamentData3(currentPage, currentDateTimestamp, oneWeekFromNowTimestamp);

    // Initial setup to show the "Next Page" button
    document.getElementById('next-week-btn').style.display = 'block';
    document.getElementById('current-week-btn').style.display = 'none';

    // Add event listeners
    document.getElementById('next-week-btn').addEventListener('click', nextPage);
    document.getElementById('current-week-btn').addEventListener('click', currentWeek);
});

// Display the current week's tournaments
function currentWeek() {
    fetchTournamentData3(currentPage, currentDateTimestamp, oneWeekFromNowTimestamp);
    document.getElementById('next-week-btn').style.display = 'block';
    document.getElementById('current-week-btn').style.display = 'none';
    showingCurrentWeek = true;
}

// Display next week's tournaments
function nextPage() {
    fetchTournamentData3(currentPage, oneWeekFromNowTimestamp, twoWeeksFromNowTimestamp);
    document.getElementById('next-week-btn').style.display = 'none';
    document.getElementById('current-week-btn').style.display = 'block';
    showingCurrentWeek = false;
}
