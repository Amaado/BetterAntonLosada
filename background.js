// Escuchar la instalación de la extensión para activar el servicio
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extensión instalada y el service worker está funcionando");
});

// Escuchar cuando se hace clic en el ícono de la extensión
chrome.action.onClicked.addListener((tab) => {
  console.log("Ícono de la extensión pulsado. Ejecutando script en la pestaña:", tab.id);
  ejecutarCodigo(tab.id);
});

// Escuchar cuando una nueva página se carga
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId !== 0) return; // Solo ejecutamos en el frame principal
  if (!details.url.startsWith("https://www.edu.xunta.gal/centros/ieslosadadieguez/aulavirtual/")) return;

  // Verificar si el checkbox está activado
  chrome.storage.sync.get("autoRunEnabled", (data) => {
      if (data.autoRunEnabled) {
          ejecutarCodigo(details.tabId);
      }
  });
}, { url: [{ hostContains: 'edu.xunta.gal' }] }); // Escuchar solo las URLs que coincidan

// Ejecutar el código para modificar el padding de la página
function ejecutarCodigo(tabId) {
  chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: modificarPagina
  });
}

// Modificar el padding de la página
function modificarPagina() {
  console.log("Modificando padding de la página");
  document.body.style.padding = "0"; // Eliminar padding global si es necesario
  
  // Modificar los elementos que ya están en la página
  document.querySelectorAll(".activity-item:not(.activityinline)").forEach(elemento => {
      elemento.style.padding = "0"; // Eliminar padding específico
  });
}
