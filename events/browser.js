let BrowserManager = require("BrowserManager.js").BrowserManager;
mp.events.add({
    "browser_open_inputManager": () => {
        BrowserManager.openPage(0,"inputManager","cef/input_manager/index.html", "MANAGER");
    },
    "browser_open_bug": () => {
        BrowserManager.openPage(18,"bug","cef/bug_report/index.html");
    },
    "browser_open_register": () => {
        BrowserManager.openPage(30,"register","cef/register/index.html");
    },
    "browser_open_login": () => {
        BrowserManager.openPage(31,"login","cef/login/index.html");
    },
    "browser_open_RTC": () => {
        BrowserManager.openPage(100, "webRTC", "cef/webRTC/index.html");
    },
    "brower_close_all": (type) => {
        BrowserManager.closeAllBrowsers(type);
    },
    

})
