let character={};

	function setSex(sex) {
        document.getElementById('sex').style.display = 'none';
        document.getElementById('ethnic').style.display = 'inline-block';
        mp.trigger('command', 'sexe', sex, false);
	}

	function setEthnic(ethnic) {
        document.getElementById('ethnic').style.display = 'none';
        document.getElementById('date').style.display = 'inline-block';
        //mp.trigger('command', 'ethnie', ethnic, false);
	}
    
    function setDate(){
        let birthDate= document.getElementById("birthDate").value;
        document.getElementById('date').style.display = 'none';
        document.getElementById('HeighWeight').style.display = 'inline-block';
        mp.trigger('command', 'naissance', birthDate.getDate() + " " + birthDay.getMonth() + " " + birthDate.getYear(), false);
    }

    function setHeighWeight(){
        let heigh= document.getElementById("Heigh").value;
        let weight= document.getElementById("Weight").value;
        document.getElementById('HeighWeight').style.display = 'none';
        mp.trigger('command', 'taille', heigh, false);
        //mp.trigger('command', 'poids', weight, true);
    }
