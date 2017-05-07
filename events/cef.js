/**
 * Cette page reçois les evenements lancés sur les browsers CEF.
 */

mp.events.add({
    "sendBug": (text) => {
        mp.gui.execute('window.location = "mp://ui/index.html"'); // page de base ( chat )
        mp.events.callRemote("playerCommand", "bug " + text); // Appel d'une commande sur le serveur
        mp.gui.execute("mp.invoke('focus', false)"); // On enleve la souris
    }
})
