{let BrowserManager = require("BrowserManager.js")
mp.events.add({
    "keyPressed": (key) => {
        mp.events.callRemote("console", key); // Evenement coté client  
        if(key === 222){ // ²
            mp.events.call('brower_close_all', "PAGE");
        }
        else if(key === 119){ // F8
            mp.events.callRemote("console", "OUVERTURE DEBUG"); // Evenement coté client  
            mp.events.call('browser_open_bug');
        }
    }
})}