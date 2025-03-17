document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("autoRunCheckbox");

    // Cargar el estado guardado del checkbox
    chrome.storage.sync.get("autoRunEnabled", (data) => {
        checkbox.checked = data.autoRunEnabled || false;
        if (checkbox.checked) {
            document.getElementById("losadaCigar").style.transition = "transform 0s ease";
            document.getElementById("losadaCigar").classList.add("active");
            setTimeout(() => {
                document.getElementById("losadaCigar").style.transition = "transform 0.3s ease";
            }, 100);
        } else {
            document.getElementById("losadaCigar").style.transition = "transform 0s ease";
            document.getElementById("losadaCigar").classList.remove("active");
            setTimeout(() => {
                document.getElementById("losadaCigar").style.transition = "transform 0.3s ease";
            }, 100);
            }
    });

    // Guardar el estado cuando cambia
    checkbox.addEventListener("change", () => {
        console.log("Cambio de estado del checkbox:", checkbox.checked);
        
        // Guardar el estado del checkbox
        chrome.storage.sync.set({ autoRunEnabled: checkbox.checked });

        // Cambiar el padding, width y height de la página según el estado del checkbox
        if (checkbox.checked) {
            // Cuando está activado, establecer el padding en 0rem y el width y height en 50px
            document.getElementById("losadaCigar").classList.add("active");
            cambiarEstilos(0.1, 30);
        } else {
            // Cuando está desactivado, establecer el padding en 1rem y el width y height en 30px
            document.getElementById("losadaCigar").classList.remove("active");
            cambiarEstilos(1, 50);
        }
    });
});

// Función para cambiar el padding, width y height de la página
function cambiarEstilos(paddingValue, sizeValue) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: modificarEstilos,
            args: [paddingValue, sizeValue]
        });
    });
}

// Función que se ejecuta en la página para modificar padding, width y height
function modificarEstilos(paddingValue, sizeValue) {
    // Cambiar el padding de los elementos .activity-item
    document.querySelectorAll(".activity-item:not(.activityinline)").forEach(elemento => {
        elemento.style.padding = `${paddingValue}rem`; // Establecer el padding
    });

    // Cambiar el width y height de los elementos .activityiconcontainer
    document.querySelectorAll(".activityiconcontainer").forEach(elemento => {
        elemento.style.width = `${sizeValue}px`;  // Establecer el ancho
        elemento.style.height = `${sizeValue}px`; // Establecer la altura
    });
}
