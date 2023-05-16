const baseurl = "http://localhost:8080/workout";

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
            var main = "";
            for (i = 0; i < workout.exercises.length; i++) {
                var exercise = workout.exercises[i]
                localStorage.setItem(exercise.id, JSON.stringify(exercise))
                main += "<div id= "+ exercise.id +" class='exercise'>"
                    + exercise.primaryName + "<p class='rep'>" + exercise.workoutExercises[0].sets 
                    + "x" +  exercise.workoutExercises[0].repetitions + "</div>"
            }
            
            document.getElementById("listaExercicios").innerHTML = main;

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
