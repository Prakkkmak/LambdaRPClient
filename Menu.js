let BrowserManager = require("BrowserManager.js").BrowserManager;
class Menu {

    constructor(){
        this.items = []
        this.browser = BrowserManager.openMenu(1, "menu", "cef/menu/index.html");
    }
    setTitle(title){
        this.browser.execute("setTitle('" + title +"')");
    }
    addItemButton(label, cmd, close){
        let button = new ItemButton(label, cmd);
        this.items.push(button);
        this.browser.execute("createButton('"+ label +"' , '" + cmd + "' , '" + close + "' )");
    }
    addItemInputButton(label, cmd){
        let button = new ItemInputButton(label, cmd);
        this.items.push(button);
        this.browser.execute("createInputbutton('"+ label +"' , '" + cmd + "')");
    }
}
class ItemButton {
    constructor(label = "Default", cmd = ""){
        this.label = label;
        this.cmd = cmd;
    }
}
class ItemInputButton {
    constructor(label = "Default", cmd = ""){
        this.label = label;
        this.cmd = cmd;
    }
}
exports.Menu = Menu;