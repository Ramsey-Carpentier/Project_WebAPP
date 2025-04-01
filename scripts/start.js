document.addEventListener("DOMContentLoaded", function() {
    let selectedDrinks = [];

    document.getElementById("SoftDrinks").addEventListener("click", function() {
        fetch("../JsonFiles/softdrinks.json")
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("drinkContainer");
                container.innerHTML = ""; 
                data.softdrinks.forEach(drink => {
                    const drinkElement = document.createElement("div");
                    drinkElement.classList.add("drink-item");
                    drinkElement.innerHTML = `
                        <h3>${drink.name}</h3>
                        <img src="${drink.image}" alt="${drink.name}">
                        <p>€${drink.price.toFixed(2)}</p>
                    `;
                    
                    drinkElement.addEventListener("click", function() {
                        selectedDrinks.push(drink.name);
                        updateCartCount();
                    });

                    container.appendChild(drinkElement);
                });
            })
            .catch(error => console.error("Error loading drinks:", error));
    });

    function updateCartCount() {
        const cartCount = document.getElementById("itemCount");

        if (selectedDrinks.length > 0) {
            cartCount.style.display = "flex";
            cartCount.textContent = selectedDrinks.length;
        } else {
            cartCount.style.display = "none";
        }
    }

    document.getElementById("winkelkar").addEventListener("click", function() {
        const drinksParam = selectedDrinks.join(',');
        window.location.href = "../pages/order.html?drinks=" + encodeURIComponent(drinksParam);
    });
});
