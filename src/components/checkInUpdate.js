//handles the update loop for the app.

export default {
    startUpdate: function () {
        setInterval(() => {
            let now = new Date();
            console.log(now.toLocaleTimeString());
        }, 1000)
    },

    stopUpdate: function() {
        clearInterval();
    }
}