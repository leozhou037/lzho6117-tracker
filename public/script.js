// Display time and date
///
const date = new Date();

// Get time and date values
let hour = date.getHours();
let minute = date.getMinutes();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Date Format
let currentDate = `${day}/${month}/${year} - ${hour}:${minute}`;

// Array to store user input data
///
var taskList = [];

function addTask(name, type, reps, sets, weight, goal, difficulty, note) {
    let task = {
        name,
        type,
        reps,
        sets,
        weight,
        goal,
        difficulty,
        note,

        id: Date.now(),
        date: currentDate,
    }
    taskList.push(task);
    displayTask(task);
}

// Add input values to array
///
const form = document.querySelector('#taskform');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    addTask(
        form.elements.taskName.value,
        form.elements.taskType.value,
        form.elements.taskReps.value,
        form.elements.taskSets.value,
        form.elements.taskWeight.value,
        form.elements.taskGoal.value,
        form.elements.taskDifficulty.value,
        form.elements.taskNote.value,
    )
    
    console.log(taskList)
    }
)

// Display data from array in task list
///
const tasklistElem = document.querySelector('#tasklist');

function displayTask(task) {
    let item = document.createElement('li');
    item.setAttribute('data-id', task.id);
    item.innerHTML = `<p>
    <strong>${task.date}</strong>
    <br>${task.name}
    <br>${task.type}
    <br>${task.reps}
    <br>${task.sets}
    <br>${task.weight}
    <br>${task.goal}
    <br>${task.difficulty}
    <br>${task.note}
    </p>`;
    tasklistElem.appendChild(item);

    // Clear form inputs
    form.reset(); 

    // Create delete button for each list item that is created
    let delButton = document.createElement('button');
    let delButtonText = document.createTextNode('Remove');
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    delButton.addEventListener('click', function(event) {
        item.remove();

        taskList.forEach(function(taskArrayElement, taskArrayIndex) {
            if (taskArrayElement.id == item.getAttribute('data-id')) {
                taskList.splice(taskArrayIndex, 1)
                }
            }
        )
        console.log(taskList);
        }
    )
}

// Log the task array to console
addTask("Exercise", "Muscle Group", 777, 777, 777); // test array;
console.log(taskList);