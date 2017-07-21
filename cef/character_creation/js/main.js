function setSex(sex) {
    document.getElementById('sexe').style.display = 'none';
    document.getElementById('ethnie').style.display = 'inline';
    if(sex === 0){
        mp.trigger("command", "sexe", 'F');
    }
    else{
        mp.trigger("command", "sexe", 'H');
    }
    
}

function setEthnic(ethnic) {
    document.getElementById('ethnie').style.display = 'none';
    document.getElementById('BD').style.display = 'inline';
}

function setBirth(){
    let birthDate = document.getElementById("Date").value;
    let birthMonth = document.getElementById("Month").value;
    let birthYear = document.getElementById("Year").value;
    document.getElementById('BD').style.display = 'none';
    document.getElementById('div_taille_poids').style.display = 'inline';
    mp.trigger("command", "naissance", birthDate + " " + birthMonth + " " + birthYear);
}

function setHeighWeight(){
    let height = document.getElementById("taille").value;
    let weight = document.getElementById("poids").value;
    mp.trigger("command", "taille", height);
    mp.trigger("command", "poids", weight, true);
    /* Il faut faire fermer le CEF ici. Je ne sais pas pourquoi mais peut importe ce que j'ajoute par la suite, cela me fait une Loop qui me ramène à la selection du Sexe */
}
