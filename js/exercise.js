function loadExercise() {
    var exerciseId = localStorage.getItem("currentExerciseId");

    var exerciseReal = JSON.parse(localStorage.getItem(exerciseId));

    document.getElementById("exerciseName").innerHTML = exerciseReal.primaryName;
    
    if (exerciseReal.workoutExercises[0].executed) {
        document.getElementById("executed").innerHTML = "EXECUTED";
    }; 

    if (exerciseReal.workoutExercises.length > 1) {
        document.getElementById("lastTime").innerHTML = exerciseReal.workoutExercises[1].sets + "x" 
            + exerciseReal.workoutExercises[1].repetitions + " with " 
            + exerciseReal.workoutExercises[1].loadValue + " " + exerciseReal.workoutExercises[1].loadType.name;
    }
 
    document.getElementById('videoTutorial').src = "https://www.youtube.com/embed/" + exerciseReal.idYoutubeVideo;
    document.getElementById('muscleName').innerHTML = exerciseReal.muscle.name;
    document.getElementById('seriesAndRepetitions').innerHTML = exerciseReal.workoutExercises[0].sets + "x" + exerciseReal.workoutExercises[0].repetitions;
    document.getElementById('load').innerHTML = exerciseReal.workoutExercises[0].loadValue != null ? exerciseReal.workoutExercises[0].loadValue + " " + exerciseReal.workoutExercises[0].loadType.name : "";
    document.getElementById('advancedTechnique').innerHTML = exerciseReal.workoutExercises[0].advancedTechnique.name != null ? exerciseReal.workoutExercises[0].advancedTechnique.name : "";
    document.getElementById('rest').innerHTML = exerciseReal.workoutExercises[0].restSeconds + "sec";
}

window.onload = function() {
    loadExercise();
}