function loadExercise() {
    var exerciseId = localStorage.getItem("currentExerciseId");

    var exerciseReal = JSON.parse(localStorage.getItem(exerciseId));

    document.getElementById("exerciseName").innerHTML = exerciseReal.primaryName;

    if (exerciseReal.workoutExercises.length > 1) {
        document.getElementById("lastTime").innerHTML = exerciseReal.workoutExercises[1].sets + "x" + exerciseReal.workoutExercises[1].repetitions + " with " + exerciseReal.workoutExercises[1].loadValue;
    }

    document.getElementById('videoTutorial').src = "https://www.youtube.com/embed/" + exerciseReal.idYoutubeVideo;
    document.getElementById('muscleName').innerHTML = exerciseReal.muscle.name;
    document.getElementById('exerciseDetails').innerHTML = exerciseReal.workoutExercises[0].sets + "x" + exerciseReal.workoutExercises[0].repetitions;
    document.getElementById('rest').innerHTML = "Rest: " + exerciseReal.workoutExercises[0].restSeconds + "sec";

    if (exerciseReal.workoutExercises[0].loadValue != null) {
        document.getElementById('exerciseDetails').innerHTML = document.getElementById('exerciseDetails').innerHTML
        + " with " + exerciseReal.workoutExercises[0].loadValue
    }

    if (exerciseReal.workoutExercises[0].advancedTechnique.name != null) {
        document.getElementById('exerciseDetails').innerHTML = document.getElementById('exerciseDetails').innerHTML
        + "<br>" + exerciseReal.workoutExercises[0].advancedTechnique.name
    }
}

window.onload = function() {
    loadExercise();
}