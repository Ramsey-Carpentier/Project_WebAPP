document.addEventListener("DOMContentLoaded", function() {
    // Haal de queryparameter op uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const drinksParam = urlParams.get('drinks');

    if (drinksParam) {
        // Zet de string om in een array
        const drinksArray = drinksParam.split(',');

        // Toon de lijst van drankjes op de pagina
        const drinkListContainer = document.getElementById("drinkList");
        drinksArray.forEach(drink => {
            const listItem = document.createElement("li");
            listItem.textContent = drink;
            drinkListContainer.appendChild(listItem);
        });
    }
});
