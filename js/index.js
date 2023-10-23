const baseurl = "http://vassopoli-pc:8080/workouts";

function resetApplicationState() {
    //I cant clear some states, like:
    // - workout date (will clear after session ends, so it's on sessionStorage)
    localStorage.clear(); //Reseting state...     
}

function exerciseDetails(id) {
    localStorage.setItem("currentExerciseId", id);
    window.location.href = "/exercise.html";
}

function loadExercise(currentDate) {
    var xmlhttp = new XMLHttpRequest();

    param = "?date=" + currentDate
    finalUrl = baseurl + param

    xmlhttp.open("GET", finalUrl, true);
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
                  
                if (exercise.workoutExercises[0].executed) {
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

function getCurrentDate() {
    const date = new Date();

    let currentDay = String(date.getDate()).padStart(2, '0');

    let currentMonth = String(date.getMonth()+1).padStart(2,"0");

    let currentYear = date.getFullYear();

    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return currentDate;
}

function getWorkoutByDate(e) {
    let workoutDate = document.getElementById("workout_date").value
    sessionStorage.setItem("workoutDate", workoutDate);

    resetApplicationState();
    loadExercise(workoutDate);
}

window.onload = function() {
    let workoutDateFromSession = sessionStorage.getItem("workoutDate");

    let workoutDate;
    
    if (workoutDateFromSession) {
        workoutDate = workoutDateFromSession;
    } else {
        workoutDate = getCurrentDate();
    }

    document.getElementById("workout_date").value = workoutDate;
    sessionStorage.setItem("workoutDate", workoutDate);

    resetApplicationState();
    loadExercise(workoutDate);
}
