mp.events.add({
    "loadIpl": (ipl) => {
        mp.game.streaming.requestIpl(ipl);
    },
    "unloadIpl": (ipl) => {
        mp.game.streaming.removeIpl(ipl);
    },
    "handcuff": (toggle) => {
        mp.events.callRemote("console", toggle);
        mp.players.local.setEnableHandcuffs(toggle);
        mp.events.callRemote("console", "cuffed = " + mp.players.local.isCuffed());
    },
    "isComponentVariationValid": (id, drawable, texture) => {
        mp.events.callRemote("console", id + " " + drawable + " " + texture);
        let valid = mp.players.local.isComponentVariationValid(id, drawable, texture);
        mp.events.callRemote("console", valid);
    }
})