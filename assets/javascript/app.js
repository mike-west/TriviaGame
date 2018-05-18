var SECONDS_IN_MIN = 60;
var TOTALQUESTIONS = 10;
var timeRemaining = 0;
var intervalId;

window.onload = function (event) {
    $("#quiz-card").hide();
    $("#results-card").hide();
    $("#start-btn").click(function () {
        $("#start-card").hide();
        $("#quiz-card").show();
        startTimer(3);
    });
    $("#sub-btn").click(function() {
        timeRemaining = 0;
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

        if (timeRemaining <=20) {
            $("#time-remaining").css("color", "yellow");
        }

        if (timeRemaining <=10) {
            $("#time-remaining").css("color", "red");
        }

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            $("#quiz-card").hide();
            getScore();
            $("#results-card").show();
        }
    }

    function getScore() {
        var rightAnswers=0
        var wrongAnswers=TOTALQUESTIONS;

        // get all inputs that are right answers and checked
        var checkedAnswers = $('.form-check-input:checked').map(function() {
            return this.value   ;
        }).get();

        checkedAnswers.forEach(function(item) {
            if (item==='right') {
                ++rightAnswers;
                --wrongAnswers;
            }
        });

        var percent = Math.floor((rightAnswers / TOTALQUESTIONS) * 100);
        $("#right-and-wrong").text("You had " + rightAnswers + " right answers and " + wrongAnswers + " wrong answers");
        
        var comment = "You scored " + percent + "%. ";
        if (percent >= 90) {
            comment = comment + " BAZINGA! I'll bet you hang out at the comic book store too";
        } else if (percent >= 80) {
            comment = comment + " Excellent! You're a Cheesecake Factory regular."
        } else if (percent >= 50) {
            comment = comment + " Hmm. You need to talk to Leonard's mother about paying attention";
        } else {
            comment = comment + "Do you even watch the show?"
        }

        $("#comment").text(comment);
    }
}