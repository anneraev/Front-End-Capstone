import stateManager from "./stateManager";

//handles the update loop for the app.
let now = new Date()

export default {
    startUpdate: function () {
        setInterval(() => {
            now = new Date();
            stateManager.newState.checkIns.forEach(checkIn => {
                if (checkIn.alertTime === now.toLocaleTimeString()){
                    alert("You are being alerted!")
                }
            })
        }, 1000)
    },

    stopUpdate: function() {
        clearInterval();
    }
}