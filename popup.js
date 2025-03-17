document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup cargado");
    const checkbox = document.getElementById("autoRunCheckbox");

    // Cargar el estado guardado del checkbox
    chrome.storage.sync.get("autoRunEnabled", (data) => {
        console.log("Estado cargado desde chrome.storage.sync:", data);
        checkbox.checked = data.autoRunEnabled || false;
    });

    // Guardar el estado cuando cambia
    checkbox.addEventListener("change", () => {
        console.log("Cambio de estado del checkbox:", checkbox.checked);
        chrome.storage.sync.set({ autoRunEnabled: checkbox.checked }, () => {
            console.log("Estado guardado correctamente:", checkbox.checked);
        });
    });
});
