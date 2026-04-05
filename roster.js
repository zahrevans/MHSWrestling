// 🔗 Your OpenSheet base URL
const BASE_URL = "https://opensheet.elk.sh/1XjxC3TOYQej1lRxbgcbz8WHke3x1v8_ki2wLU8W8c5E";

// Load both rosters
async function loadRoster() {
  loadTeam("Boy Wrestlers", "boysRoster");
  loadTeam("Girl Wrestlers", "girlsRoster");
}

// Generic function to load a team
async function loadTeam(sheetName, containerId) {
  try {
    const res = await fetch(`${BASE_URL}/${sheetName}`);
    const data = await res.json();

    const container = document.getElementById(containerId);

    // Clear container (just in case)
    container.innerHTML = "";

    // 🔁 FOR EACH LOOP (what you wanted)
    data.forEach(wrestler => {
      const btn = document.createElement("div");
      btn.classList.add("btn");

      btn.innerHTML = `
        <strong>${wrestler.Name}</strong><br>
        ${wrestler.Year} • ${wrestler["Weight Class"]}<br>
        Record: ${wrestler.Record}
      `;

      // Optional: click to show more info
      btn.addEventListener("click", () => {
        alert(`${wrestler.Name}\n${wrestler.Year}\n${wrestler["Weight Class"]}\nRecord: ${wrestler.Record}`);
      });

      container.appendChild(btn);
    });

  } catch (err) {
    console.error("Error loading roster:", err);
  }
}

// Run it
loadRoster();