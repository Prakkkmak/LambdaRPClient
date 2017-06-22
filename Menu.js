let BrowserManager = require("BrowserManager.js").BrowserManager;
class Menu {

    constructor(){
        this.items = []
        this.browser = BrowserManager.openMenu(1, "menu", "cef/menu/index.html");
    }
    setTitle(title){
        this.browser.execute("setTitle('" + title +"')");
    }
    addItemButton(label, cmd){
        let button = new ItemButton(label, cmd);
        this.items.push(button);
        mp.events.callRemote('console', "createButton('"+ label +"' + '" + cmd + "')")
        this.browser.execute("createButton('"+ label +"' , '" + cmd + "')");
    }
}
class ItemButton {
    constructor(label = "Default", cmd = ""){
        this.label = label;
        this.cmd = cmd;
    }
}
exports.Menu = Menu;