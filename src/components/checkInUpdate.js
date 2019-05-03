
//handles the update loop for the app.
let now = new Date()
let currentState

export default {
    updateState: function (state){
        currentState = state;
    },
    startUpdate: function (history) {
        setInterval(() => {
            //get current time.
            now = new Date();
            //checks current time against all checkIn times for user, and initiates an alert when the current time matches an alert time.
            currentState.checkIns.forEach(checkIn => {
                if (checkIn.alertTime === now.toLocaleTimeString()){
                    alert("redirecting");
                    history.push("/")
                }
            })
        }, 1000)
    },

    //stops the update. Often called in componentWillMount so that the update function won't be using old information upon page load, and will start up again using the new data after render.
    stopUpdate: function() {
        clearInterval();
    }
}