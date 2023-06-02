const baseurl = "http://localhost:8080/workouts";

function exerciseDetails(id) {
    localStorage.setItem("currentExerciseId", id);
    window.location.href = "/exercise.html";
}

function loadExercise() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", baseurl, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
            var workout = JSON.parse(xmlhttp.responseText);

            var head = "<div id= " + workout.id + '>' + '<h3>' + workout.date 
                + "</h3>" + '<p>Letter: ' + workout.letter + "</p>" + '<p>Type: ' 
                + workout.workoutType.name + "</p>" + '<p>Aerobic time: ' 
                + workout.aerobicTimeInMinutes + 'min.' + "</p>";

            var main = "";

            for (i = 0; i < workout.exercises.length; i++) {
                var exercise = workout.exercises[i]
                localStorage.setItem(exercise.id, JSON.stringify(exercise))
                main += "<div id= "+ exercise.id +" class='exercise'>"
                    + exercise.primaryName + "<p class='rep'>" + exercise.workoutExercises[0].sets 
                    + "x" +  exercise.workoutExercises[0].repetitions;
                // Verify if there is a advanced technique in the exercise, then show which is.
                if (exercise.workoutExercises[0].advancedTechnique.name != "") {
                    main += "<p class='advancedTechnique'>" + exercise.workoutExercises[0].advancedTechnique.name + "</p>" 
                };    
                    if (exercise.workoutExercises[0].executed == true) {
                    main += "<p class='success'>EXECUTED</p>"
                };  

                main += "</div>";
            }
            
            document.getElementById("dayInfo").innerHTML = head;

            document.getElementById("listExercises").innerHTML = main;

            document.querySelectorAll('.exercise').forEach(item => {
                item.addEventListener('click', event => {
                    exerciseDetails(item.id)
                })
            })
        }
    }
    xmlhttp.send();
}
window.onload = function() {

    loadExercise();
}
