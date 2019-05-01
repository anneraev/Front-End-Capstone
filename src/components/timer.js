export default {
    startTimer: function () {
        setInterval(() => {
            alert("One Minute!")
        }, 60000)
    },

    stopTimer: function() {
        clearInterval();
    }
}