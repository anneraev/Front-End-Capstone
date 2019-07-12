let now = new Date()
let usersAlerts = []

//handles the update loop for the app.

export default {
    updateUsersAlerts: function (alerts){
        //passed list of all user alerts is filtered for those just assocaited with the current user.
        if (alerts) {
            usersAlerts = alerts.filter(alert => alert.userId === parseInt(sessionStorage.getItem("userId")))
        } else {
            usersAlerts = []
        }
    },
    startUpdate: function (history) {
        setInterval(() => {
            //get current time.
            now = new Date();
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const seconds = now.getSeconds()
            const hoursSeconds = (hours * 60) * 60
            const minutesSeconds = minutes * 60
            const time = hoursSeconds + minutesSeconds + seconds
            //checks current time against all checkIn times for user, and initiates an alert when the current time matches an alert time.
            usersAlerts.forEach(checkIn => {
                if (checkIn.alertSeconds === time){
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