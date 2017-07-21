require("./events/keyManager.js"); // Appel de la gestion des touches
require("./events/browser.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/command.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/natives.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/server.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/camera.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/menu.js"); // Le cef reçois les evenemnts lancés dans le cef
require("./events/vocal.js"); 
require("./init.js");
mp.events.call("browser_open_inputManager");