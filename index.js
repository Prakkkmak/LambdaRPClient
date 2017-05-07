require("./events/keyManager.js"); // Appel de la gestion des touches
require("./events/browser.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/command.js"); // Le cef reçois les evenemnts lancés dans le cef
mp.events.call("browser_open_inputManager");