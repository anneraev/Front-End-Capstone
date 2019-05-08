
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
            //could probably improve this by storing a number equal to the number of seconds that the alertTime equals in the data for that alert, then comparing total seconds from the information acccessed here, and simply comparing the numbers.
            now = new Date();
            let hours = now.getHours()
            let minutes = now.getMinutes()
            const seconds = now.getSeconds()
            if (hours >= 9 && hours < 0) {
                hours = `0${hours}`
            }
            if (minutes >= 9 && minutes < 0) {
                minutes = `0${minutes}`
            }
            const time = `${hours}:${minutes}`
            //checks current time against all checkIn times for user, and initiates an alert when the current time matches an alert time.
            currentState.checkIns.forEach(checkIn => {
                if (checkIn.alertTime === time && seconds === 0){
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