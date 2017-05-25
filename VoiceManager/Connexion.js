class Connexion {
    constructor(players, volume = 100, type = 0){
        this.players = players;
        this.type = 0;
        this.volume = 100;
        this.id = Connexion.generateRoomId(type);
        Connexion.connexions.push(this);
    }
    changeVolume(volume){
        this.volume = volume;
        // Function RTC pour changer le volume
    }
    getPlayerIndex(player){
        return this.players.indexOf(player);
    }
    join(player){
        if(this.getPlayerIndex(player) === -1){
             this.players.push(player);
        }
    }
    leave(player){
        let index = getPlayerIndex(player);
        if(index >= 0){
            this.players.splice(index, 1);
        }
    }
    static generateRoomId(type = 0){
        let id = 0;
    
        if(type === 1){
            id = 1000
        }
        for(let con of Connexion.connexions){
            if(con.id !== id) return id
            id++
        }
        return id;
    }
    static getConnexion(id){
        for(let con of Connexion.connexions){
            if(con.id === id) return con;
        }
        return null;
    }
    static join(player, id){
        let connexion = Connexion.getConnexion(id)
        if(connexion){
            connexion.join(player);
        }
        else{
            connexion = new Connexion([player]);
        }
        return connexion;
    }
}
Connexion.connexions = [];
module.exports = Connexion;
