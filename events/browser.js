let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "browser_open_inputManager": () => {
        BrowserManager.openPage(0,"inputManager","cef/input_manager/index.html", "MANAGER");
    },
    "browser_open_bug": () => {
        BrowserManager.openPage(8,"bug","cef/bug_report/index.html");
    },
    "brower_close_all": (type) => {
        BrowserManager.closeAllBrowsers(type);
    }
})
