document.addEventListener('DOMContentLoaded', function() {

    let tafelnummer;
    function onScanSuccess(decodedText, decodedResult) {
        document.getElementById("qr-result").innerText = "Is uw Tafelnummer:  " + decodedText + "?";
        tafelnummer = decodedText;
        document.getElementById("confirm-btn").disabled = false;
    }

    function onScanError(errorMessage) {
        console.warn("Scan error:", errorMessage);
    }


    let qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.start(
        { facingMode: "user" }, 
        { fps: 10, qrbox: 250 },  
        onScanSuccess,
        onScanError    
    );

    document.getElementById("confirm-btn").addEventListener("click", function() {
        window.location.href = `/Project_WebAPP/pages/start.html?tafelnummer=${encodeURIComponent(tafelnummer)}`;
    });

});
