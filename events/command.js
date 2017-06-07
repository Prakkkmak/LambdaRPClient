let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "command": (command, args, closePage = false) => {
        if(closePage) BrowserManager.closeAllBrowsers();
        let cmd = command;
        if(args) cmd += " " + args;
        mp.events.callRemote("playerCommand", cmd); // Appel d'une commande sur le serveur
    }
})
