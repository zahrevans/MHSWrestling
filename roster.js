const link = "https://script.google.com/macros/s/AKfycbzSogjWEfy3WrVVzShV9G2FAzyd5XNM4PdwWC6WrijC1ddEt7TbrbocRytFF2UGM_0c/exec";

// Fetch data
async function loadRoster() {
    try {
        const res = await fetch(link);
        const data = await res.json();
        displayRoster(data.male, "boysRoster");
        displayRoster(data.female, "girlsRoster");

    } catch (err) {
        console.error("Error loading roster:", err);
    }
}

// Create cards
function displayRoster(team, containerId) {
    console.log(team)
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // clear before adding

    if (!team || !Array.isArray(team)) {
        console.warn(`No team data available for ${containerId}`);
        return;
    }

    team.forEach(player => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
      <div class="card-content">
        <img src="${player.Image || 'default.png'}" class="card-img">

        <h3>${player.Name}</h3>

        <p><strong>Year:</strong> ${player.Year}</p>
        <p><strong>Weight:</strong> ${player["Weight Class"]}</p>
        <p><strong>Record:</strong> ${player.Record}</p>
      </div>
    `;

        container.appendChild(card);
    });
}

// Run it
loadRoster();