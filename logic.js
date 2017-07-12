  var config = {
      apiKey: "AIzaSyCDgnYYVEBVaUuCr6hWRXRoIaBcsb9Npc4",
      authDomain: "first-4ecf9.firebaseapp.com",
      databaseURL: "https://first-4ecf9.firebaseio.com",
      projectId: "first-4ecf9",
      storageBucket: "first-4ecf9.appspot.com",
      messagingSenderId: "999661596674"
  };
  firebase.initializeApp(config);


  moment().format();
  var database = firebase.database();

  $("#submitButton").click(function() {
      event.preventDefault();

      var users = database.ref("/vehicles/");
      var newVehicle = users.push();
      newVehicle.set({
          "name": $("#name").val().trim(),
          "dest": $("#dest").val().trim(),
          "startTime": $("#startTime").val().trim(),
          "frequency": $("#frequency").val().trim(),
          "dateAdded": firebase.database.ServerValue.TIMESTAMP
      })

  });

  var vehicleRef = database.ref("/vehicles/").orderByChild("dateAdded");


  vehicleRef.on('child_added', function(data) {
              var vehicleData = data.val();
              var time = parseMoment(vehicleData.startTime);
              var nextTrain;
  			  var timeOfArrival;
  			  var freq = vehicleData.frequency;
  			  var startTime = vehicleData.startTime;
  			  var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
  			  console.log(startTimeConverted);
  			  var currentTime = moment();
  			  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  			  var diffTime = moment().diff(moment(startTimeConverted), "minutes");
 			  console.log("DIFFERENCE IN TIME: " + diffTime);
  			  var tRemainder = diffTime % freq;
 			  console.log(tRemainder);
  			  var nextTrain = freq - tRemainder;
  			  console.log("MINUTES TILL TRAIN: " + nextTrain);
  			  var timeOfArrival = moment().add(nextTrain, "minutes");
  			  console.log("ARRIVAL TIME: " + moment(timeOfArrival).format("hh:mm"));
  			  var timeArrDisp = moment(timeOfArrival).format("hh:mm");
              $("#tableBody")
                  .prepend($("<tr>")
                      .append($("<td>").text(vehicleData.name),
                          $("<td>").text(vehicleData.dest),
                          $("<td>").text(vehicleData.startTime),
                          $("<td>").text(vehicleData.frequency),
                          $("<td>").text(nextTrain),
                          $("<td>").text(timeArrDisp)
                      ));
 

});

function parseMoment(time) {
    return moment(time);
};