let Menu = require("Menu.js").Menu;
let menu;
mp.events.add({
    "menu_create": (title) => {
        if(!menu){
            menu = new Menu();
        }
    },
    "menu_set_title": (title) => {
        if(title){
            menu.addItemButton(label, cmd);
        }
    },
    "menu_create_item_button": (label, cmd, close = true) => {
        if(menu){
            menu.addItemButton(label, cmd, close);
        }
        else{
            menu = new Menu();
            menu.addItemButton(label, cmd, close);
        }
    },
    "menu_vehicles_list": (vehList) => {
        if(!menu) menu = new Menu();
        vehList = vehList.split(",")
        for(let vehicle of vehList){
            menu.addItemButton(vehicle, "va creer " + vehicle, true);
        }
    },
    "menu_create_item_input_button": (label, cmd) => {
        if(menu){
            menu.addItemInputButton(label, cmd);
        }
        else{
            menu = new Menu();
            menu.addItemInputButton(label, cmd);
        }
    }
});