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
    join(player){
        
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
    static join(id){
        let connexion = getConnexion(id)
        if(connexion){
            
        }
    }
}
Connexion.connexions = [];
module.exports = Connexion;
