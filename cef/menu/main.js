let buttons = [];
let buttonSelectioned = 0;
let MAX = 25;
let getMenuButtons = document.getElementById("menu_buttons");
function createButton(name = "Défaut", cmd = null){
    let newButton = document.createElement("BUTTON");
    let text = document.createTextNode(name);
    newButton.appendChild(text);
    getMenuButtons.appendChild(newButton);
    newButton.setAttribute('onclick', "command('" + cmd + "')")
    newButton.cmd = cmd;
    newButton.active = true;
    buttons.push(newButton);
    changeSelection(0);
    if(buttons.length < MAX) max = button.length - 1;
    else max = MAX;
}
document.onkeydown = (e) => {
    if(e.keyCode === 38){
        changeSelection(-1);
    }
    else if(e.keyCode === 40){
        changeSelection(+1);
    }
    else if(e.keyCode === 13){
        select();
    }
}
function display(){
    if(buttons.length > MAX){
        let min = Math.floor(buttonSelectioned - MAX/2)
        let max = Math.floor(buttonSelectioned + MAX/2)
        if(min < 0) max += -min
        if(max > buttons.length - 1 ) min -= button.length - 1 - max;
        for(let i = 0; i < buttons.length ; i++){
            if(i < min || i > max){
                if(buttons[i].active){
                    buttons[i].active = false;
                    buttons[i].style.display = "none";
                }
            }
            else{
                if(!buttons[i].active){
                    buttons[i].active = true;
                    buttons[i].style.display = "block";
                }
            }
        }
    }
}
function changeSelection(i){
    if(buttons.length > 0){
        buttons[buttonSelectioned].style.color = "blue";
        do {
            buttonSelectioned += i
            while(buttonSelectioned >= buttons.length){
                buttonSelectioned -= buttons.length;
            }
            while(buttonSelectioned < 0){
                buttonSelectioned += buttons.length;
            }
        }
        while(!buttons[buttonSelectioned].active)
        buttons[buttonSelectioned].style.color = "yellow";
        display();
    }  
}
function select(){
    command(buttons[buttonSelectioned].cmd);
    buttonSelectioned = 0;
    changeSelection(0);
}

function deleteButton(id = 0){
    id = buttons.length - 1
    getMenuButtons.removeChild(buttons[id]);
    buttons.splice(id, 1)
}
function command(cmd) {
    cmd = cmd.split(' ');
    let text = "";
    for(let i = 1; i < cmd.length ; i++){
        if(i !== cmd.length - 1){
            text += cmd[i] + " ";
        } 
        else{
            text += cmd[i];
        }       
    }
    closeAllButtons();
    mp.trigger('command', cmd[0], text);
}
function closeAllButtons(){
    while(buttons.length > 0){
        deleteButton();
    }
}