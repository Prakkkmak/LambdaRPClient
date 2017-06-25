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
    "menu_create_item_button": (label, cmd) => {
        if(menu){
            menu.addItemButton(label, cmd);
        }
        else{
            menu = new Menu();
            menu.addItemButton(label, cmd);
        }
    }
});