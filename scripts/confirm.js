
document.addEventListener("DOMContentLoaded", function () {
    let vehicle = document.getElementById("vehicle");
    let successMessage = document.getElementById("success-message");

    setTimeout(() => {
        vehicle.style.transition = "transform 3s linear";
        vehicle.style.transform = "translateX(100vw)";
    }, 100);

    setTimeout(() => {
        vehicle.style.display = "none";
        successMessage.style.display = "block";

        // Toon pushmelding met bestelling
        console.log("toon notificatie");
        showOrderNotification();

    }, 3100);
});

function showOrderNotification() {
    const categories = [
        "selectedDrinks",
        "selectedBeers",
        "selectedWines",
        "selectedSnacks",
        "selectedhotdrinks"
    ];

    let drinkCounts = {};
    let tafelnummer = sessionStorage.getItem("tafelnummer") || "Onbekende tafel";

    categories.forEach(category => {
        const items = JSON.parse(sessionStorage.getItem(category) || "[]");
        items.forEach(item => {
            const match = item.match(/(.+?) \(/);
            if (match) {
                const name = match[1].trim();
                drinkCounts[name] = (drinkCounts[name] || 0) + 1;
            }
        });
    });

    // Genereer notificatietekst
    let orderSummary = Object.entries(drinkCounts)
        .map(([name, count]) => `${count}x ${name}`)
        .join(", ");

    let notificationBody = `${tafelnummer}: ${orderSummary}`;

    navigator.serviceWorker.getRegistration().then(function(registration) {
        if (registration) {
            registration.showNotification('Bestelling bevestigd!', {
                body: notificationBody,
                icon: '../images/cropped-notifications.png'
            });
        }
    });
}

