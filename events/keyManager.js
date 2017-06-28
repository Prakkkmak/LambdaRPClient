let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "keyPressed": (key) => {
        key = Number(key);
    
        switch(key) {
            case 17:
                mp.events.callRemote("defaultAction")
                break;
            case 222:
                mp.events.callRemote("menuAction")
                break;
            case 45:
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
            case 37:
                mp.events.call('command', 'validateTop', '0');
                break;
            case 39:
                mp.events.call('command', 'validateTop', '1');
                break;
            case 119:
                mp.events.call('browser_open_bug');
                break;
            case 112:
                mp.events.call('browser_open_bug');
                break;
            case 103:
                mp.events.call('command', 'changeSkin', '0 -');
                break;
            case 105:
                mp.events.call('command', 'changeSkin', '0 +');
                break;
            case 100:
                mp.events.call('command', 'changeSkin', '1 -');
                break;
            case 102:
                mp.events.call('command', 'changeSkin', '1 +');
                break;
            case 97:
                mp.events.call('command', 'changeSkin', '2 -');
                break;
            case 99:
                mp.events.call('command', 'changeSkin', '2 +');
                break;
            case 109:
                mp.events.call('command', 'vselection', '0');
                break;
            case 107:
                mp.events.call('command', 'vselection', '1');
                break;
            case 90:
                /*for(let i = 0; i < 10; i++){
                     mp.events.call('command', 'va', 'creer bmx');
                }*/
                break;

        }   
      
    }
})
mp.keys.bind(226, true, () => {
    mp.nametags.enabled = true;
})
mp.keys.bind(226, false, () => {
    mp.nametags.enabled = false;
})
