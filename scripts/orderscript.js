document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const drinksParam = urlParams.get('drinks');
    const drinkCounts = {};
    
    if (drinksParam) {
        const drinksArray = drinksParam.split(',');
        drinksArray.forEach(drink => {
            drinkCounts[drink] = (drinkCounts[drink] || 0) + 1;
        });
    }
    
    const drinkListContainer = document.getElementById("drinkList");
    for (const [drink, count] of Object.entries(drinkCounts)) {
        const listItem = document.createElement("li");
        listItem.classList.add("drink-item");
        
        const nameSpan = document.createElement("span");
        nameSpan.textContent = `${drink} ---- `;
        
        const countSpan = document.createElement("span");
        countSpan.textContent = count;
        countSpan.classList.add("drink-count");
        
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        
        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.addEventListener("click", () => {
            if (drinkCounts[drink] > 1) {
                drinkCounts[drink]--;
                countSpan.textContent = drinkCounts[drink];
            } else {
                delete drinkCounts[drink];
                listItem.remove();
            }
        });
        
        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.addEventListener("click", () => {
            drinkCounts[drink]++;
            countSpan.textContent = drinkCounts[drink];
        });
        
        btnContainer.appendChild(minusBtn);
        btnContainer.appendChild(countSpan);
        btnContainer.appendChild(plusBtn);
        
        listItem.appendChild(nameSpan);
        listItem.appendChild(btnContainer);
        drinkListContainer.appendChild(listItem);
    }

    document.getElementById("confirmOrder").addEventListener("click", function() {
        window.location.href = "confirm.html";
    });

    document.getElementById("keerdekewere").addEventListener("click", function() {
        window.location.href = "../index.html";
    });
});