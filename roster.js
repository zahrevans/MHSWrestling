const API =
        "https://script.google.com/macros/s/AKfycbzSogjWEfy3WrVVzShV9G2FAzyd5XNM4PdwWC6WrijC1ddEt7TbrbocRytFF2UGM_0c/exec";
      let rosterData = { male: [], female: [] };
      let currentGender = "male";

      async function loadRoster() {
        try {
          const res = await fetch(API);
          const data = await res.json();
          rosterData.male = data.male || [];
          rosterData.female = data.female || [];

          const total = rosterData.male.length + rosterData.female.length;
          const heroEl = document.getElementById("heroTotalWrestlers");
          if (heroEl) heroEl.textContent = total || "—";

          // Compute loss count from records
          let losses = 0;
          [...rosterData.male, ...rosterData.female].forEach((p) => {
            const rec = p.Record || "";
            const parts = rec.split("-");
            if (parts.length >= 2) {
              const l = parseInt(parts[1]);
              if (!isNaN(l)) losses += l;
            }
          });
          // Show team loss count placeholder — replace with actual team losses if you have them
          const lossEl = document.getElementById("lossCount");
          if (lossEl) lossEl.textContent = "?"; // replace '?' with actual team loss total

          renderRoster(currentGender);
        } catch (err) {
          document.getElementById("rosterGrid").innerHTML =
            '<div class="roster-loading" style="color:#c8946a;">Failed to load roster. Check connection.</div>';
          console.error(err);
        }
      }

      function renderRoster(gender) {
        const grid = document.getElementById("rosterGrid");
        const team = rosterData[gender];
        if (!team || !team.length) {
          grid.innerHTML =
            '<div class="roster-loading">No wrestlers found.</div>';
          return;
        }
        grid.innerHTML = team
          .map((p, i) => {
            const name = p.Name || "Unknown";
            const year = p.Year || "—";
            const wt = p["Weight Class"] || "—";
            const rec = p.Record || "—";
            const img = p.Image;
            const initials = name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            const frontImg = img
              ? `<img src="${img}" alt="${name}" onerror="this.parentElement.innerHTML='<div class=\\'flip-front-placeholder\\'><svg width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'white\\' stroke-width=\\'1.5\\'><circle cx=\\'12\\' cy=\\'8\\' r=\\'4\\'></circle><path d=\\'M4 20c0-4 3.6-7 8-7s8 3 8 7\\'></path></svg></div>'">`
              : `<div class="flip-front-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="8" r="4"></circle><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"></path></svg></div>`;

            return `
        <div class="flip-card" onclick="this.classList.toggle('flipped')" style="animation-delay:${i * 0.04}s">
          <div class="flip-card-inner">
            <div class="flip-front">
              ${frontImg}
              <div class="flip-front-body">
                <div class="flip-wrestler-name">${name}</div>
                <div class="flip-wrestler-sub">${wt} lbs</div>
                <div class="flip-hint">Tap to view stats</div>
              </div>
            </div>
            <div class="flip-back">
              <div class="flip-back-name">${name}</div>
              <div class="flip-stat-row">
                <span class="flip-stat-label">Year</span>
                <span class="flip-stat-val">${year}</span>
              </div>
              <div class="flip-stat-row">
                <span class="flip-stat-label">Weight</span>
                <span class="flip-stat-val">${wt} lbs</span>
              </div>
              <div class="flip-stat-row">
                <span class="flip-stat-label">Record</span>
                <span class="flip-stat-val">${rec}</span>
              </div>
              <div class="flip-close-hint">Tap to flip back</div>
            </div>
          </div>
        </div>`;
          })
          .join("");
      }

      function switchGender(gender, btn) {
        currentGender = gender;
        document
          .querySelectorAll(".gender-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("rosterGrid").innerHTML =
          '<div class="roster-loading">Loading<span class="loading-dot">.</span><span class="loading-dot">.</span><span class="loading-dot">.</span></div>';
        setTimeout(() => renderRoster(gender), 200);
      }

      function switchTab(tabId, btn) {
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".tab-panel")
          .forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("tab-" + tabId).classList.add("active");
      }

      loadRoster();