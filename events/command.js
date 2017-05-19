let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "command": (command, args, closePage = false) => {
        if(closePage) BrowserManager.closeAllBrowsers();
        mp.events.callRemote("playerCommand", command + " " + text); // Appel d'une commande sur le serveur
    }
})
