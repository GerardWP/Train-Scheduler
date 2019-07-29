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
    trainObject
});

// database.ref("/trains").on("child_added", function (snap) {

// }, function (errorObject) {
//     console.log("Error handled: " + errorObject.code);
// });