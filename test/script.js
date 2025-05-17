window.addEventListener("DOMContentLoaded", () => {
    const cameraSelect = document.getElementById("cameraSelect");
    let html5QrCode;

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    // Stap 1: Camera's ophalen
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            // Dropdown vullen
            devices.forEach((device, index) => {
                const option = document.createElement("option");
                option.value = device.id;
                option.text = device.label || `Camera ${index + 1}`;
                cameraSelect.appendChild(option);
            });

            // Optioneel: automatisch eerste camera starten
            startScanner(devices[0].id);
        }
    }).catch(err => {
        console.error("Fout bij ophalen camera's:", err);
    });

    // Stap 2: Scanner starten
    function startScanner(cameraId) {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
                html5QrCode.start(
                    cameraId,
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    onScanSuccess,
                    onScanFailure
                );
            });
        } else {
            html5QrCode = new Html5Qrcode("qrreader");
            html5QrCode.start(
                cameraId,
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                onScanFailure
            );
        }
    }

    // Stap 3: Wisselen van camera
    cameraSelect.addEventListener("change", () => {
        const selectedCameraId = cameraSelect.value;
        startScanner(selectedCameraId);
    });
});
