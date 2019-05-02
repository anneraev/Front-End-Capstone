import stateManager from "./stateManager";

//handles the update loop for the app.
let now = new Date()

export default {
    startUpdate: function (history) {
        console.log("update starting");
        setInterval(() => {
            now = new Date();
            stateManager.newState.checkIns.forEach(checkIn => {
                if (checkIn.alertTime === now.toLocaleTimeString()){
                    alert("redirecting");
                    history.push("/")
                }
            })
        }, 1000)
    },

    stopUpdate: function() {
        console.log("update paused")
        clearInterval();
    }
}