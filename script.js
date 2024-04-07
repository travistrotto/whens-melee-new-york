const subtitleElement = document.getElementById('subtitle');
const today = new Date();
const oneWeekFromToday = new Date(today);
oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7);
subtitleElement.textContent = `${today.toDateString()} - ${oneWeekFromToday.toDateString()} `;

function displayTournaments(tournaments) {
    const tournamentList = document.getElementById('tournament-list');
    tournamentList.innerHTML = '';

    // Reverse the order of tournaments
    tournaments.reverse();

    tournaments.forEach(tournament => {
        const tournamentDiv = document.createElement('div');
        tournamentDiv.classList.add('tournament');

        const tournamentName = document.createElement('h2');
        tournamentName.textContent = tournament.name;
        tournamentDiv.appendChild(tournamentName);

        // Create a link to the tournament details page
        const tournamentLink = document.createElement('a');
        tournamentLink.href = generateTournamentURL(tournament.name);
        tournamentLink.textContent = "Tournament Details";
        tournamentDiv.appendChild(tournamentLink);

        const eventsList = document.createElement('ul');
        tournament.events.forEach(event => {
            const eventItem = document.createElement('li');
            // Create SVG icon element
            const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("height", "16"); // Half the original height
            svgIcon.setAttribute("viewBox", "0 0 24 24");
            svgIcon.setAttribute("width", "16"); // Half the original width
            svgIcon.innerHTML = `<path d="m2 2v2h5v4h-5v2h5c1.11 0 2-.89 2-2v-1h5v10h-5v-1c0-1.11-.89-2-2-2h-5v2h5v4h-5v2h5c1.11 0 2-.89 2-2v-1h5c1.11 0 2-.89 2-2v-4h6v-2h-6v-4c0-1.11-.89-2-2-2h-5v-1c0-1.11-.89-2-2-2z"/>`;
            eventItem.appendChild(svgIcon);
            // Add text content
            eventItem.innerHTML += ` ${event.name} - Start: ${new Date(event.startAt * 1000).toLocaleDateString()}, Entrants: ${event.numEntrants || 'N/A'}`;
            eventsList.appendChild(eventItem);
        });
        tournamentDiv.appendChild(eventsList);

        tournamentList.appendChild(tournamentDiv);
    });
}

function generateTournamentURL(tournamentName) {
    // Remove symbols and fill spaces with dashes
    let slug = tournamentName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();

    // Limit slug to 10 words
    const words = slug.split('-');
    if (words.length > 10) {
        slug = words.slice(0, 10).join('-');
    }

    return `https://www.start.gg/tournament/${slug}/details`;
}
