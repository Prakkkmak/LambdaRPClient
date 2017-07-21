mp.events.add({
    "loadIpl": (ipl) => {
        mp.game.streaming.requestIpl(ipl);
    },
    "unloadIpl": (ipl) => {
        mp.game.streaming.removeIpl(ipl);
    },
    "handcuff": (toggle) => {
        mp.players.local.setEnableHandcuffs(toggle);
    },
    "isComponentVariationValid": (id, drawable, texture) => {
        let valid = mp.players.local.isComponentVariationValid(id, drawable, texture);
    },
    "setUndriveable": (vehicleId, bool) => {
        mp.vehicles.at(vehicleId).setUndriveable(bool);
    },
    "setDoorOpen": (vehicleId, index, loose,instantly) => {
         mp.vehicles.at(vehicleId).setDoorOpen(index, loose, instantly);
    },
    "setDoorShut": (vehicleId, index, instantly) => {
         mp.vehicles.at(vehicleId).setDoorShut(index, instantly);
    },
    "freeze": (toggle) => {
        mp.players.local.freezePosition(toggle);
    },
    "create_checkpoint": (position) => {
        mp.checkpoints.new(position);
    }
})