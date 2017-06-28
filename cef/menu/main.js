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
    return newButton;
}
function createInputbutton(name = "0", cmd = "null"){
    let button = createButton(name,cmd);
    button.inputButton = true;
    button.cmdParam = "";
}
function changeButtonValue(val){
    val = Number(val);
    let button = buttons[buttonSelectioned];
    if(button.inputButton){
        if(val >= 0){
            if(button.innerHTML === "0"){
                button.innerHTML = val
            }
            else{
                button.innerHTML = button.innerHTML + val;
            }
        }
        else{
            button.innerHTML = button.innerHTML.slice(0,-1);
        }
        button.cmdParam = button.innerHTML;
    }
    
}
document.onkeydown = (e) => {
    if(e.keyCode === 38){
        changeSelection(-1);
    }
    else if(e.keyCode === 40){
        changeSelection(+1);
    }
    else if(e.keyCode === 37){
        changeSelection(-10);
    }
    else if(e.keyCode === 39){
        changeSelection(+10);
    }
    else if(e.keyCode <= 105 && e.keyCode >= 96){
        changeButtonValue(e.keyCode - 96);
    }
    else if(e.keyCode === 8){
         changeButtonValue(-1);
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
    if(buttons[buttonSelectioned].cmdParam){
        buttons[buttonSelectioned].cmd += " " + buttons[buttonSelectioned].cmdParam;
    }
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
    for(let i = buttons.length - 1; i >= 0; i--){
        deleteButton(i)
    }
}