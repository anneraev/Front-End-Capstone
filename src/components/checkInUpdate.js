
//handles the update loop for the app.
let now = new Date()
let currentState

export default {
    updateState: function (state){
        currentState = state;
    },
    startUpdate: function (history) {
        setInterval(() => {
            now = new Date();
            currentState.checkIns.forEach(checkIn => {
                if (checkIn.alertTime === now.toLocaleTimeString()){
                    alert("redirecting");
                    history.push("/")
                }
            })
        }, 1000)
    },

    stopUpdate: function() {
        clearInterval();
    }
}