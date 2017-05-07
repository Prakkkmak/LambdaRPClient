/**
 * Cette page reçois les evenements lancés sur les browsers CEF.
 */
mp.events.add({
    "closeAll": () => {
        mp.browsers.forEach((element) => {
            mp.events.callRemote("console", '0'); // Evenement coté client
            if(element.url !== "package://cef/input_manager/index.html"){ // Si ce n'est pas le input manager
                mp.events.callRemote("console", 'a'); // Evenement coté client  
                mp.gui.execute("mp.invoke('focus', false)");
                element.destroy();
            } 
        }, this);
    },
    "sendBug": (text) => {
        mp.events.call("closeAll");
        mp.events.callRemote("playerCommand", "bug " + text); // Appel d'une commande sur le serveur
        mp.gui.execute("mp.invoke('focus', false)"); // On enleve la souris
    }
})
