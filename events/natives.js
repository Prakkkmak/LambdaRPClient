mp.events.add({
    "loadIpl": (ipl) => {
        mp.game.streaming.requestIpl(ipl);
    },
    "unloadIpl": (ipl) => {
        mp.game.streaming.removeIpl(ipl);
    }
})