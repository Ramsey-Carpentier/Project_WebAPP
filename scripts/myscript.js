document.addEventListener('DOMContentLoaded', function () {

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/service-worker.js").then(
                registration => {
                    console.log("ServiceWorker geregistreerd:", registration);
                },
                err => {
                    console.log("ServiceWorker registratie mislukt:", err);
                }
            );
        });
    }

    let tafelnummer;
    let currentFacingMode = "environment";
    let html5QrCode;
    let cameraId = null;

    const qrResult = document.getElementById("qr-result");
    const confirmBtn = document.getElementById("confirm-btn");
    const switchCameraBtn = document.getElementById("switch-camera-btn");

    confirmBtn.addEventListener("click", function () {
        window.location.href = `/pages/start.html?tafelnummer=${encodeURIComponent(tafelnummer)}`;

    });
    
    function getQueryParam(url, param) {
    let queryString = url.split('?')[1] || '';
    let params = new URLSearchParams(queryString);
    return params.get(param);
    }

    function onScanSuccess(decodedText, decodedResult) {
        console.log("onScanSuccess aangeroepen");
        console.log("decodedText:", decodedText);

        tafelnummer = getQueryParam(decodedText, 'tafelnummer');

        if (tafelnummer) {
            console.log("Tafelnummer = " + tafelnummer);
            document.getElementById("qr-result").innerText = "Is uw Tafelnummer: " + tafelnummer + "?";
            document.getElementById("confirm-btn").disabled = false;
        } else {
            document.getElementById("qr-result").innerText = "Gescande QR-code bevat geen tafelnummer.";
            tafelnummer = null;
            document.getElementById("confirm-btn").disabled = true;
        }
    }

    async function startScanner() {
        try {
            html5QrCode = new Html5Qrcode("qr-reader");

            await html5QrCode.start(
                { facingMode: user }, // "environment" of "user"
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                onScanSuccess,
                onScanError
            );
        } catch (err) {
            console.error("Camera fout:", err);
            qrResult.innerText = "Camera kon niet worden gestart. Controleer toestemmingen en browser.";
        }
    }

    async function switchCamera() {
        if (html5QrCode) {
            await html5QrCode.stop();
            html5QrCode.clear();
        }

        currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
        startScanner();
    }


    switchCameraBtn.addEventListener("click", switchCamera);

    

    startScanner();
});

window.addEventListener("beforeunload", async () => {
    if (html5QrCode && html5QrCode._isScanning) {
        await html5QrCode.stop();
        html5QrCode.clear();
    }
});