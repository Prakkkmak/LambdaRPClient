let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "keyPressed": (key) => {
        if(key === 17){ // e
            mp.events.callRemote("defaultAction")
        }
        if(key === 27){ // escape
            mp.events.call('brower_close_all', "PAGE");
        }
        else if(key === 119){ // F8
            mp.events.call('browser_open_bug');
        }
    }
})
