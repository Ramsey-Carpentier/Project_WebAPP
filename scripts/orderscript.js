document.addEventListener("DOMContentLoaded", function () {

    let tafelNummer = sessionStorage.getItem("tafelnummer") || null;

    // Verzamel alles uit de verschillende storage arrays
    const categories = [
        "selectedDrinks",
        "selectedBeers",
        "selectedWines",
        "selectedSnacks",
        "selectedhotdrinks"
    ];

    let combinedDrinks = [];
    const drinkCategories = {};

    categories.forEach(category => {
        const items = JSON.parse(sessionStorage.getItem(category) || "[]");
        items.forEach(item => {
            combinedDrinks.push(item);
            const match = item.match(/(.+?) \(/);
            if (match) {
                drinkCategories[match[1].trim()] = category;
            }
        });
    });


    // Voeg tafelnummer vooraan toe als die bestaat
    if (tafelNummer) {
        combinedDrinks.unshift(tafelNummer);
    }

    // Bouw een string zoals 'Tafel 5,Cola (€2.50),Cola (€2.50)'
    drinksParam = combinedDrinks.join(",");

    // Nu bestaande verwerking:
    const drinkCounts = {};
    const drinkPrices = {};
    let totalPrice = 0;

    if (drinksParam) {
        const drinksArray = drinksParam.split(',');

        if (drinksArray[0].startsWith("Tafel ")) {
            tafelNummer = drinksArray.shift(); // verwijder tafelnummer
        }

        drinksArray.forEach(drinkInfo => {
            const match = drinkInfo.match(/(.+?) \((€[\d.]+)\)/);
            if (match) {
                const drinkName = match[1].trim();
                const drinkPrice = parseFloat(match[2].replace("€", ""));
                drinkCounts[drinkName] = (drinkCounts[drinkName] || 0) + 1;
                drinkPrices[drinkName] = drinkPrice;
            }
        });
    }

    if (tafelNummer) {
        document.getElementById("tafelNummerDisplay").textContent = tafelNummer;
    }

    const drinkTable = document.getElementById("drinkTable");
    const totalPriceElement = document.getElementById("totalPrice");

    function updateTable() {
        drinkTable.querySelectorAll("tbody")?.forEach(t => t.remove());

        const tbody = document.createElement("tbody");
        totalPrice = 0;

        for (const [drink, count] of Object.entries(drinkCounts)) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = drink;

            const countCell = document.createElement("td");
            const minusBtn = document.createElement("button");
            minusBtn.textContent = "-";
            minusBtn.style.border = "2px solid #ffd500";
            minusBtn.style.borderRadius = "5px";
            minusBtn.style.color = "#ffd500";
            minusBtn.style.marginRight = "5px";
            const plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.style.border = "2px solid #ffd500";
            plusBtn.style.borderRadius = "5px";
            plusBtn.style.color = "#ffd500";
            plusBtn.style.marginLeft = "5px";
            const countSpan = document.createElement("span");
            countSpan.textContent = count;

            // Gebruik flexbox voor de count, plus, en minus knoppen naast elkaar
            const countContainer = document.createElement("div");
            countContainer.style.display = "flex";
            countContainer.style.alignItems = "center";
            countContainer.style.justifyContent = "center";
            countContainer.appendChild(minusBtn);
            countContainer.appendChild(countSpan);
            countContainer.appendChild(plusBtn);

            minusBtn.addEventListener("click", () => {
                if (drinkCounts[drink] > 1) {
                    drinkCounts[drink]--;
                } else {
                    delete drinkCounts[drink];
                    delete drinkPrices[drink];
                }
                // Update de sessionStorage na wijziging
                updateSessionStorage();
                updateTable();
            });

            plusBtn.addEventListener("click", () => {
                drinkCounts[drink]++;
                // Update de sessionStorage na wijziging
                updateSessionStorage();
                updateTable();
            });

            countCell.appendChild(countContainer);

            const unitPriceCell = document.createElement("td");
            unitPriceCell.textContent = `€${drinkPrices[drink].toFixed(2)}`;

            const subtotal = drinkPrices[drink] * count;
            const subtotalCell = document.createElement("td");
            subtotalCell.textContent = `€${subtotal.toFixed(2)}`;

            totalPrice += subtotal;

            row.appendChild(nameCell);
            row.appendChild(countCell);
            row.appendChild(unitPriceCell);
            row.appendChild(subtotalCell);

            tbody.appendChild(row);

            // Voeg een gele lijn toe tussen de drankjes
            const lineRow = document.createElement("tr");
            const lineCell = document.createElement("td");
            lineCell.setAttribute("colspan", "4");
            lineCell.style.borderBottom = "2px dashed yellow";  // Gele streepjeslijn
            lineRow.appendChild(lineCell);
            tbody.appendChild(lineRow);
        }

        if (Object.keys(drinkCounts).length === 0) {
            const emptyRow = document.createElement("tr");
            const emptyCell = document.createElement("td");
            emptyCell.setAttribute("colspan", "4");
            emptyCell.style.color = "white";
            emptyCell.textContent = "Geen bestelling gevonden.";
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        }

        drinkTable.appendChild(tbody);
        totalPriceElement.textContent = `Totale prijs: €${totalPrice.toFixed(2)}`;
    }

    // Functie om de sessionStorage bij te werken
    function updateSessionStorage() {
    // Reset de arrays per categorie
    const updatedByCategory = {
        selectedDrinks: [],
        selectedSnacks: [],
        selectedBeers: [],
        selectedhotdrinks: [],
        selectedWines: []
    };

    for (const [drink, count] of Object.entries(drinkCounts)) {
        const category = drinkCategories[drink] || "selectedDrinks"; // fallback
        for (let i = 0; i < count; i++) {
            updatedByCategory[category].push(`${drink} (€${drinkPrices[drink].toFixed(2)})`);
        }
    }

    // Opslaan per originele categorie
    for (const category of categories) {
        sessionStorage.setItem(category, JSON.stringify(updatedByCategory[category]));
    }
}


    updateTable();

    document.getElementById("confirmOrder").addEventListener("click", function () {
        // sessionStorage.clear(); // of specifieke items
        window.location.href = "confirm.html";
    });

    document.getElementById("keerdekewere").addEventListener("click", function () {
        window.location.href = "../pages/start.html";
    });
});
