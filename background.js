chrome.runtime.onInstalled.addListener(() => {
  console.log("Extensión instalada y el service worker está funcionando");
});

// Escuchar cuando se hace clic en el ícono de la extensión
chrome.action.onClicked.addListener((tab) => {
  console.log("Ícono de la extensión pulsado. Ejecutando script en la pestaña:", tab.id);
  ejecutarCodigo(tab.id);
});

// Escuchar cuando se navega a una nueva página
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url) { // Verificar si 'tab' y 'tab.url' están definidos
    if (tab.url.startsWith("https://www.edu.xunta.gal/centros/")) {
      // Verificar si el checkbox está activado
      chrome.storage.sync.get("autoRunEnabled", (data) => {
        if (data.autoRunEnabled) {
          ejecutarCodigo(tabId);
        }
      });
    }
  }
});

// Ejecutar el código para modificar el padding de la página
function ejecutarCodigo(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: modificarPagina
  });
}

// Modificar el padding de la página
function modificarPagina() {
  document.querySelectorAll(".activity-item:not(.activityinline)").forEach(elemento => {
    elemento.style.padding = "0";
  });
  document.querySelectorAll(".activityiconcontainer").forEach(elemento => {
    elemento.style.width = "30px";
    elemento.style.height = "30px";
  });
}
