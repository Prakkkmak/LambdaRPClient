{class BrowserManager {
    constructor(id,name,url,type = "PAGE"){
        this.id = id; // L'id du browser
        this.name = name; // Le nom du browser
        this.url = "package://" + url; // L'url du browser
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
    static openPage(id,name,url,type = "PAGE"){
        let browser = new BrowserManager(id,name,url,type);
        if(browser.type === "PAGE"){
            BrowserManager.closeAllBrowsers("PAGE");
            mp.gui.execute("mp.invoke('focus', true)");
        }
        BrowserManager.browsers.push(browser);
        
    }
    static get pageOpen(){
        for(let browser of BrowserManager.browsers){
            if(browser.type === "PAGE") return true;
        }
        return false;
    }
    static closeAllBrowsers(type){
        for(let browser of BrowserManager.browsers){
            if(browser.type === type) browser.close();
        }
    }

}
BrowserManager.browsers = [];
module.exports = BrowserManager;}