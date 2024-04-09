/*
 * tournamentList.js
 * Displays a list of all tournaments retrieved by fetch.js
 */

// Show date range of tournaments as subtitle
function updateSubtitle() {
    const subtitleElement = document.getElementById('subtitle');
    const today = new Date();
    const oneWeekFromToday = new Date(today);
    oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7);
    const twoWeeksFromToday = new Date(today);
    twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);

    let startDate, endDate;

    if (showingNextWeek) {
        startDate = oneWeekFromToday;
        endDate = twoWeeksFromToday;
    } else {
        startDate = today;
        endDate = oneWeekFromToday;
    }

    subtitleElement.textContent = `
Showing tournaments occuring:
${startDate.toDateString()} - ${endDate.toDateString()} 
`;
}

// List all tournaments returned by start.gg api
function tournamentList(tournaments) {
    const tournamentList = document.getElementById('tournament-list');
    tournamentList.innerHTML = '';
    tournaments.reverse();

    tournaments.forEach(tournament => {
        const tournamentDiv = document.createElement('div');
        tournamentDiv.classList.add('tournament');

        // Tournament Name
        const tournamentName = document.createElement('h2');
        tournamentName.textContent = tournament.name;
        tournamentDiv.appendChild(tournamentName);

        // Date
        const tournamentDate = document.createElement('p');
        tournamentDate.style.display = "inline";
        if (tournament.events.length > 0) {
            const event = tournament.events[0];
            const eventItem = document.createElement('p');
            const calendarSVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 0 1 1 1v1h4V3a1 1 0 1 1 2 0v1h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zM8 6H5v3h14V6h-3v1a1 1 0 1 1-2 0V6h-4v1a1 1 0 0 1-2 0V6zm11 5H5v8h14v-8z" fill="#0D0D0D"/></svg>`;
            const dateSpan = document.createElement('span');
            dateSpan.style.fontFamily = "Trebuchet MS"; // Setting font-family to monospace
            dateSpan.textContent = new Date(event.startAt * 1000).toLocaleDateString();
            eventItem.innerHTML = `${calendarSVG} `;
            eventItem.appendChild(dateSpan); // Appending dateSpan to eventItem
            eventItem.style.display = "inline";
            tournamentDate.appendChild(eventItem);
        }
        tournamentDiv.appendChild(tournamentDate);


        const space = document.createTextNode(' - ');
        tournamentDiv.appendChild(space);

        // Link to Details and Registration
        const tournamentDetailsLink = document.createElement('a');
        tournamentDetailsLink.href = generateTournamentURL(tournament.name);
        tournamentDetailsLink.textContent = "Details";
        tournamentDetailsLink.style.display = "inline";
        tournamentDiv.appendChild(tournamentDetailsLink);

        const commaSpace = document.createTextNode(', ');
        tournamentDiv.appendChild(commaSpace);

        const registerLink = document.createElement('a');
        registerLink.href = generateTournamentRegisterURL(tournament.name);
        registerLink.textContent = "Register";
        registerLink.style.display = "inline";
        tournamentDiv.appendChild(registerLink);

        // List all brackets being held
        const eventsList = document.createElement('ul');
        tournament.events.forEach(event => {
            const eventItem = document.createElement('li');

            const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("height", "12"); // Half the original height
            svgIcon.setAttribute("viewBox", "0 0 24 24");
            svgIcon.setAttribute("width", "12"); // Half the original width
            svgIcon.innerHTML = `<path d="m2 2v2h5v4h-5v2h5c1.11 0 2-.89 2-2v-1h5v10h-5v-1c0-1.11-.89-2-2-2h-5v2h5v4h-5v2h5c1.11 0 2-.89 2-2v-1h5c1.11 0 2-.89 2-2v-4h6v-2h-6v-4c0-1.11-.89-2-2-2h-5v-1c0-1.11-.89-2-2-2z"/>`;
            eventItem.appendChild(svgIcon);

            eventItem.innerHTML += ` ${event.name} - Registered: ${event.numEntrants || 'N/A'}`;
            eventsList.appendChild(eventItem);
        });
        tournamentDiv.appendChild(eventsList);

        // Floating Link button
        const iconContainer = document.createElement('a');
        iconContainer.href = generateTournamentURL(tournament.name);
        iconContainer.classList.add('icon-container');
        const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgIcon.setAttribute("fill", "none");
        svgIcon.setAttribute("height", "24");
        svgIcon.setAttribute("viewBox", "0 0 24 24");
        svgIcon.setAttribute("width", "24");
        svgIcon.innerHTML = `<path d="m10 6h-4c-1.10457 0-2 .89543-2 2v10c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2v-4m-4-10h6m0 0v6m0-6-10 10" stroke="#4a5568" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>`;
        iconContainer.appendChild(svgIcon);
        tournamentDiv.appendChild(iconContainer);

        tournamentList.appendChild(tournamentDiv);
    });
}

// Build link to tournaments start.gg for Registration
function generateTournamentRegisterURL(tournamentName) {
    let slug = tournamentName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
    const words = slug.split('-');
    if (words.length > 10) {
        slug = words.slice(0, 10).join('-');
    }

    return `https://www.start.gg/tournament/${slug}/register`;
}


// Build link to tournaments start.gg
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
