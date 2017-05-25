let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "keyPressed": (key) => {
        key = Number(key);
    
        switch(key) {
            case 17:
                mp.events.callRemote("defaultAction")
                break;
            case 27:
                mp.events.call('brower_close_all', "PAGE");
                break;
            case 119:
                mp.events.call('browser_open_bug');
                break;
            case 112:
                mp.events.call('browser_open_bug');
                break;
            case 100:
                //mp.events.call('command', 'prevPant');
                break;
            case 101:
                //mp.events.call('command', 'nextPant')
                break;
            case 97:
                //mp.events.call('command', 'prevPantColor');
                break;
            case 98:
                //mp.events.call('command', 'nextPantColor')
                break;
            case 104:
                //mp.events.call('command', 'savePant')
                break;

        }   
      
    }
})
