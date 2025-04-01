
document.addEventListener("DOMContentLoaded", function () {
    let vehicle = document.getElementById("vehicle");
    let successMessage = document.getElementById("success-message");

    // Wacht een korte tijd voordat de animatie start
    setTimeout(() => {
        vehicle.style.transition = "transform 3s linear";
        vehicle.style.transform = "translateX(100vw)";
    }, 100); // Korte delay om te zorgen dat de pagina goed is geladen

    setTimeout(() => {
        vehicle.style.display = "none";
        successMessage.style.display = "block";
    }, 3100); // Wacht net iets langer dan de animatie voordat het verdwijnt
});

