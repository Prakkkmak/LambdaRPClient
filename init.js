mp.nametags.enabled = false;
mp.nametags.set({hbar:{border:[0.0, 0.0], size:[0.0, 0.0]}});
mp.players.forEach((client) => {
    client.name = client.id + ""; 
})
let console = (text) => {
    mp.events.callRemote("console", text);
}
mp.console = console;
mp.isChatActive = () => {
   /* mp.gui.execute("let active = 'false';"
     +"if(chat.input){active = 'true'}else active = 'false'; "
     +"mp.trigger('setChatActive', active);");*/
     mp.gui.execute("mp.trigger('setChatActive', chat.input + '')")
    return mp.chatActive;
}