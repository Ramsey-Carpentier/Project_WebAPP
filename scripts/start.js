document.addEventListener("DOMContentLoaded", function () {
    let selectedDrinks = [];
    let selectedSnacks = [];
    let selectedBeers = [];
    let selectedhotdrinks = [];
    let selectedWines = [];

    const urlParams = new URLSearchParams(window.location.search);
    let tafelNummer = urlParams.get("tafelnummer");

    if (tafelNummer && tafelNummer !== "undefined") {

        sessionStorage.setItem("tafelnummer", tafelNummer);
    } else {
        tafelNummer = sessionStorage.getItem("tafelnummer");
    }

    if (tafelNummer && tafelNummer !== "undefined") {

        const tafelElement = document.getElementById("tafelnummer");
        if (tafelElement) {
            tafelElement.innerText = "Tafelnummer: " + tafelNummer;
        }
    }

    // ⬇️ Herstel vorige keuzes uit sessionStorage
    loadSelections();

    function saveSelections() {
        sessionStorage.setItem("selectedDrinks", JSON.stringify(selectedDrinks));
        sessionStorage.setItem("selectedSnacks", JSON.stringify(selectedSnacks));
        sessionStorage.setItem("selectedBeers", JSON.stringify(selectedBeers));
        sessionStorage.setItem("selectedhotdrinks", JSON.stringify(selectedhotdrinks));
        sessionStorage.setItem("selectedWines", JSON.stringify(selectedWines));
    }

    function loadSelections() {
        selectedDrinks = JSON.parse(sessionStorage.getItem("selectedDrinks")) || [];
        selectedSnacks = JSON.parse(sessionStorage.getItem("selectedSnacks")) || [];
        selectedBeers = JSON.parse(sessionStorage.getItem("selectedBeers")) || [];
        selectedhotdrinks = JSON.parse(sessionStorage.getItem("selectedhotdrinks")) || [];
        selectedWines = JSON.parse(sessionStorage.getItem("selectedWines")) || [];
        updateCartCount();
    }

    // Functie om cart te updaten
    function updateCartCount() {
        const cartCount = document.getElementById("itemCount");
        if (!cartCount) return;

        const totalItems = selectedDrinks.length + selectedSnacks.length + selectedBeers.length + selectedhotdrinks.length + selectedWines.length;
        if (totalItems > 0) {
            cartCount.style.display = "flex";
            cartCount.textContent = totalItems;
        } else {
            cartCount.style.display = "none";
        }
    }


    document.getElementById("SoftDrinks").addEventListener("click", function () {
        fetch("../JsonFiles/softdrinks.json")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("drinkContainer");
                if (!container) return;
                container.innerHTML = "";

                data.softdrinks.forEach(drink => {
                    const drinkElement = document.createElement("div");
                    drinkElement.classList.add("drink-item");
                    drinkElement.innerHTML = `
                        <h3>${drink.name}</h3>
                        <img src="${drink.image}" alt="${drink.name}" class="drink-image">
                        <p>€${drink.price.toFixed(2)}</p>
                    `;

                    const image = drinkElement.querySelector("img");

                    drinkElement.addEventListener("click", function () {
                        selectedDrinks.push(`${drink.name} (€${drink.price.toFixed(2)})`);
                        saveSelections();
                        updateCartCount();

                        image.classList.add("enlarge");
                        setTimeout(() => image.classList.remove("enlarge"), 200);
                    });

                    container.appendChild(drinkElement);
                });
            });
    });

    document.getElementById("Snacks").addEventListener("click", function () {
        fetch("../JsonFiles/snacks.json")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("drinkContainer");
                if (!container) return;
                container.innerHTML = "";

                data.snacks.forEach(snack => {
                    const snackElement = document.createElement("div");
                    snackElement.classList.add("snack-item");
                    snackElement.innerHTML = `
                        <h3>${snack.name}</h3>
                        <img src="${snack.image}" alt="${snack.name}" class="snack-image">
                        <p>€${snack.price.toFixed(2)}</p>
                    `;

                    const image = snackElement.querySelector("img");

                    snackElement.addEventListener("click", function () {
                        selectedSnacks.push(`${snack.name} (€${snack.price.toFixed(2)})`);
                        saveSelections();
                        updateCartCount();

                        image.classList.add("enlarge");
                        setTimeout(() => image.classList.remove("enlarge"), 100);
                    });

                    container.appendChild(snackElement);
                });
            });
    });

    document.getElementById("beer").addEventListener("click", function () {
        fetch("../JsonFiles/beer.json")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("drinkContainer");
                if (!container) return;
                container.innerHTML = "";

                data.beers.forEach(beer => {
                    const beerElement = document.createElement("div");
                    beerElement.classList.add("drink-item");
                    beerElement.innerHTML = `
                        <h3>${beer.name}</h3>
                        <img src="${beer.image}" alt="${beer.name}" class="drink-image">
                        <p>€${beer.price.toFixed(2)}</p>
                    `;

                    const image = beerElement.querySelector("img");

                    beerElement.addEventListener("click", function () {
                        selectedBeers.push(`${beer.name} (€${beer.price.toFixed(2)})`);
                        saveSelections();
                        updateCartCount();

                        image.classList.add("enlarge");
                        setTimeout(() => image.classList.remove("enlarge"), 100);
                    });

                    container.appendChild(beerElement);
                });
            });
    });

    document.getElementById("hotdrinks").addEventListener("click", function () {
        fetch("../JsonFiles/hotdrinks.json")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("drinkContainer");
                if (!container) return;
                container.innerHTML = "";

                data.hotdrinks.forEach(drink => {
                    const drinkElement = document.createElement("div");
                    drinkElement.classList.add("hotdrink-item");
                    drinkElement.innerHTML = `
                        <h3>${drink.name}</h3>
                        <img src="${drink.image}" alt="${drink.name}" class="hotdrink-image">
                        <p>€${drink.price.toFixed(2)}</p>
                    `;

                    const image = drinkElement.querySelector("img");

                    drinkElement.addEventListener("click", function () {
                        selectedhotdrinks.push(`${drink.name} (€${drink.price.toFixed(2)})`);
                        saveSelections();
                        updateCartCount();

                        image.classList.add("enlarge");
                        setTimeout(() => image.classList.remove("enlarge"), 100);
                    });

                    container.appendChild(drinkElement);
                });
            });
    });

    document.getElementById("wine").addEventListener("click", function () {
        fetch("../JsonFiles/wines.json")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("drinkContainer");
                if (!container) return;
                container.innerHTML = "";

                data.wines.forEach(drink => {
                    const drinkElement = document.createElement("div");
                    drinkElement.classList.add("drink-item");
                    drinkElement.innerHTML = `
                        <h3>${drink.name}</h3>
                        <img src="${drink.image}" alt="${drink.name}" class="drink-image">
                        <p>€${drink.price.toFixed(2)}</p>
                    `;

                    const image = drinkElement.querySelector("img");

                    drinkElement.addEventListener("click", function () {
                        selectedWines.push(`${drink.name} (€${drink.price.toFixed(2)})`);
                        saveSelections();
                        updateCartCount();

                        image.classList.add("enlarge");
                        setTimeout(() => image.classList.remove("enlarge"), 200);
                    });

                    container.appendChild(drinkElement);
                });
            });
    });

    document.getElementById("winkelkar").addEventListener("click", function () {
        // Geen data doorgeven via URL – alles zit in sessionStorage!
        window.location.href = `../pages/order.html`;
    });
});
