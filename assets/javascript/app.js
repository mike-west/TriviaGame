var SECONDS_IN_MIN = 60;
var timeRemaining = 0;
var intervalId;

window.onload = function (event) {
    $("#quiz-card").hide();
    $("#results-card").hide();
    $("#start-btn").click(function () {
        $("#start-card").hide();
        $("#quiz-card").show();
        startTimer(1);
    });

    function startTimer(min) {
        timeRemaining = min * SECONDS_IN_MIN;
        $("#time-remaining").text = timeConverter(timeRemaining);
        intervalId = setInterval(count, 1000);
    }

    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

    function count() {
        --timeRemaining;
        var converted = timeConverter(timeRemaining);
        $("#time-remaining").text(converted);

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            $("#quiz-card").hide();
            $("#results-card").show();
        }
    }
}