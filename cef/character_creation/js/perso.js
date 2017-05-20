let character={};

	function setSex(sex) {
		character.sex=sex
        document.getElementById('sexe').style.display = 'none';
        document.getElementById('ethnie').style.display = 'inline-block';
	}

	function setEthnie(ethnie) {
		character.ethnie=ethnie
        document.getElementById('ethnie').style.display = 'none';
        document.getElementById('date').style.display = 'inline-block';
	}
    
    function setDate(){
        character.date= document.getElementById("Data").value;
        alert(character.date);
        document.getElementById('date').style.display = 'none';
        document.getElementById('div_taille_poids').style.display = 'inline-block';
    }

    function setTaillePoids(){
        character.taille= document.getElementById("taille").value;
        character.poids= document.getElementById("poids").value;
        alert(character.taille);
        alert(character.poids);
        document.getElementById('div_taille_poids').style.display = 'none';
    }
