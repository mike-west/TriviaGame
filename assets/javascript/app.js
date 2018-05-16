window.onload = function (event) {
    $("#quiz-card").hide();
    $("#results-card").hide();
    $("#start-btn").click(function () {
        $("#start-card").hide();
        $("#quiz-card").show();
    });
}