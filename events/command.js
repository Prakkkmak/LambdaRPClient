{let BrowserManager = require("BrowserManager.js");
mp.events.add({
    "command": (command, args, closePage = false) => {
        if(closePage) BrowserManager.closeAllPages();
        mp.events.callRemote("playerCommand", command + " " + text); // Appel d'une commande sur le serveur
    }
})}
