var firebaseConfig = {
    apiKey: "AIzaSyCWEVZvGVRgZcmZErLF1_iELWgfTrA8OT0",
    authDomain: "trains-e2846.firebaseapp.com",
    databaseURL: "https://trains-e2846.firebaseio.com",
    projectId: "trains-e2846",
    storageBucket: "",
    messagingSenderId: "72162705303",
    appId: "1:72162705303:web:c9e8bbb0a61f1680"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function updateClock() {
    var theTime = moment().format('LT');
    $('#clock').html(theTime);
};

updateClock();
setInterval(function () {
    updateClock();
}, 1000);



// var currentTime = moment().format("HH:mm");

// console.log(currentTime)


$("#submit").on("click", function (event) {

    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    var trainObject = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    database.ref("/trains").push(trainObject);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");

});

database.ref("/trains").on("child_added", function (snap) {


    var sv = snap.val();
    var key = snap.ref.key;

    var convTime = moment(sv.firstTrainTime, "HH:mm");

    var timeDiff = moment().diff(moment(convTime), "minutes");

    var remainder = timeDiff % sv.frequency;

    var minsTillArrival = sv.frequency - remainder;

    var nextArrivalTime = moment().add(minsTillArrival, "minutes");
    var nextTrainTime = moment(nextArrivalTime).format("hh:mm");

    var row = $('<tr id="' + key + '">');
    var tdName = $('<td class="table-info">' + sv.trainName + '</td>');
    var tdDest = $('<td class="table-info">' + sv.destination + '</td>');
    var tdFreq = $('<td style="width: 18%">' + sv.frequency + '<span> min</span>' + '</td>');
    var tdArrTime = $('<td style="width: 17%">' + nextTrainTime + '</td>');
    var tdArrMin = $('<td style="width: 17%">' + minsTillArrival + '</td>');
    var tdRemove = $('<td style="width: 18%">');
    var rmvButton = $("<button>");
    rmvButton.attr("data", key).attr('id', 'rmvBtn').text("✕");
    tdRemove.append(rmvButton);
    row.append(tdName, tdDest, tdFreq, tdArrTime, tdArrMin, tdRemove);
    $("tbody").append(row);

    console.log(sv);
    // console.log(key);

}, function (errorObject) {
    console.log("Error handled: " + errorObject.code);
});

database.ref("/trains").on("child_removed", function (snap) {
    var key = snap.ref.key;
    $("#" + key).remove();
});

$(document).on("click", "#rmvBtn", function () {
    console.log($(this).attr("data"));
    database.ref("/trains").child($(this).attr("data")).remove();
});