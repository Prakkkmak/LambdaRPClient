let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "keyPressed": (key) => {
        key = Number(key);
        if(mp.isChatActive() == 'null'){
            switch(key) {
                case 17:
                    mp.events.callRemote("defaultAction")
                    break;
                case 222:
                    mp.events.callRemote("menuAction")
                    break;
                case 73:
                    mp.events.callRemote("inventory_open")
                    break;
                case 112:
                    mp.events.callRemote("helps")
                    break;
                case 113:
                    mp.events.callRemote("admin")
                    break;
                case 27:
                    mp.events.call('brower_close_all', "PAGE");
                    break;
                case 119:
                    mp.events.call('browser_open_bug');
                    break;
            }   
        }
        else{
            if(key === 13){
                mp.chatActive = 'null'
            }
        }
    }
})
mp.keys.bind(226, true, () => {
    mp.nametags.enabled = true;
})
mp.keys.bind(226, false, () => {
    mp.nametags.enabled = false;
})
