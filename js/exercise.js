function loadExercise() {
    var exerciseId = localStorage.getItem("currentExerciseId");

    var exerciseReal = JSON.parse(localStorage.getItem(exerciseId));

    document.getElementById("exerciseName").innerHTML = exerciseReal.primaryName;
    
    var executed = "";

    if (exerciseReal.workoutExercises[0].executed == true) {
        document.getElementById("executed").innerHTML = "EXECUTED";
    }; 

    if (exerciseReal.workoutExercises.length > 1) {
        document.getElementById("lastTime").innerHTML = exerciseReal.workoutExercises[1].sets + "x" 
            + exerciseReal.workoutExercises[1].repetitions + " with " 
            + exerciseReal.workoutExercises[1].loadValue + " " + exerciseReal.workoutExercises[1].loadType.name;
    }
 
    document.getElementById('videoTutorial').src = "https://www.youtube.com/embed/" + exerciseReal.idYoutubeVideo;
    document.getElementById('muscleName').innerHTML = exerciseReal.muscle.name;
    document.getElementById('exerciseDetails').innerHTML = exerciseReal.workoutExercises[0].sets + "x" + exerciseReal.workoutExercises[0].repetitions;
    document.getElementById('rest').innerHTML = exerciseReal.workoutExercises[0].restSeconds + "sec";

    if (exerciseReal.workoutExercises[0].loadValue != null) {
        document.getElementById('exerciseDetails').innerHTML = document.getElementById('exerciseDetails').innerHTML
        + " with " + exerciseReal.workoutExercises[0].loadValue + " " + exerciseReal.workoutExercises[0].loadType.name;
    }

    if (exerciseReal.workoutExercises[0].advancedTechnique.name != null) {
        document.getElementById('exerciseDetails').innerHTML = document.getElementById('exerciseDetails').innerHTML
        + "<br>" + exerciseReal.workoutExercises[0].advancedTechnique.name;
    }
}

window.onload = function() {
    loadExercise();
}