mp.browsers.new("package://cef/input_manager/index.html");
mp.events.add({
    "keyPressed": (key) => {
        mp.events.callRemote("console", key); // Evenement coté client  
        if(key === 27){
            mp.events.callRemote("console", key); // Evenement coté client  
            mp.events.call('closeAll');
        }
    }
})