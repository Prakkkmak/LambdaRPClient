class BrowserManager {
    constructor(id,name,url,type = "PAGE"){
        this.id = id; // L'id du browser
        this.name = name; // Le nom du browser
        if(url.indexOf("http") === -1){
            this.url = "package://" + url; // L'url du browser
        }
        else{
            this.url = url;
        }
        this.type = type; // Le type du browser
        this.transform = mp.browsers.new(this.url); // L'objet mp.browser de rage 
    }
    close(){
        BrowserManager.browsers.splice(BrowserManager.browsers.indexOf(this));
        this.transform.destroy();
        if(this.type === "PAGE"){
            mp.gui.execute("mp.invoke('focus', false)");
        }
    }
    execute(code){
        this.transform.execute(code);
    }
    static openMenu(id, name, url, type = "MENU"){
        let menu = new BrowserManager(id,name,url,type);
        if(menu.type === "MENU"){
            BrowserManager.closeAllBrowsers("MENU");
        }
        BrowserManager.browsers.push(menu)
        return menu;
    }
    static openPage(id,name,url,type = "PAGE"){
        let browser = new BrowserManager(id,name,url,type);
        if(browser.type === "PAGE"){
            BrowserManager.closeAllBrowsers();
            mp.gui.execute("mp.invoke('focus', true)");
            mp.gui.chat.activate(false);
        }
        BrowserManager.browsers.push(browser);  
        return browser;
    }
    static get pageOpen(){
        for(let browser of BrowserManager.browsers){
            if(browser.type === "PAGE") return true;
        }
        return false;
    }
    static closeAllBrowsers(type = "PAGE"){
        for(let browser of BrowserManager.browsers){
            if(browser.type === type) browser.close();
        }
        mp.gui.chat.activate(true);
    }
}
BrowserManager.browsers = [];
exports.BrowserManager = BrowserManager;