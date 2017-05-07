mp.browsers.new("package://cef/input_manager/index.html");
mp.events.add({
    "keyPressed": () => {
        mp.events.callRemote("keyPressed", key);
    }
})