///// Display time and date
/////
const date = new Date();

// Get time and date values
let hour = date.getHours();
let minute = date.getMinutes();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Date Format
let currentDate = `${day}/${month}/${year} - ${hour}:${minute}`;

///// Array to store user input data
/////
// var taskList = [];

// Function to add task to the list
function addTask(name, type, reps, sets, weight, weightMeasurement, goal, difficulty, note) {
    // Object to pass input parameters
    let task = {
        name,
        type,
        reps,
        sets,
        weight,
        weightMeasurement,
        goal,
        difficulty,
        note,

        id: Date.now(),
        date: currentDate,
    }

    // Fetching and parse localStorage value
    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localTasks == null) {
        localTasks = [task];
    } else {
        // Check if there is an existing task
        if (localTasks.find(element => element.id === task.id)) {
            console.log('Task ID already exists')
        } else {
            localTasks.push(task);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(localTasks));

    // taskList.push(task);
    displayTasks();
}

///// Add input values into array
/////
// Variable for DOM selection of HTML elements
const form = document.querySelector('#taskform');

// Event listener for submit button
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieving input values and adding into addTask function
    addTask(
        form.elements.taskName.value,
        form.elements.taskType.value,
        form.elements.taskReps.value,
        form.elements.taskSets.value,
        form.elements.taskWeight.value,
        form.elements.taskWeightMeasurement.value,
        form.elements.taskGoal.value,
        form.elements.taskDifficulty.value,
        form.elements.taskNote.value,
    )
    }
)

///// Display data from array in task list
/////
// Variable for DOM selection of HTML elements
const tasklistElem = document.querySelector('#tasklist');

function displayTasks() {
    tasklist.innerHTML = "";

    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localTasks !== null) {
        localTasks.forEach((task) => {

            console.log(task);

            // Create task items for the DOM and add to the list
            let item = document.createElement('li');
            item.setAttribute('data-id', task.id);
            item.innerHTML = `<p>
            <strong>${task.date}</strong>
            <br>${task.name}
            <br>${task.type}
            <br>${task.reps}
            <br>${task.sets}
            <br>${task.weight}${task.weightMeasurement}
            <br>${task.goal}
            <br>${task.difficulty}
            <br>${task.note}
            </p>`;
            tasklistElem.appendChild(item);

            // Clear form inputs after task gets displayed
            form.reset(); 

            // Create delete button for each list item that is created
            let delButton = document.createElement('button');
            let delButtonText = document.createTextNode('Remove');
            delButton.appendChild(delButtonText);
            item.appendChild(delButton);

            // Event listener for when the delete button is clicked
            delButton.addEventListener('click', function(event) {
                localTasks.forEach(function(taskArrayElement, taskArrayIndex) {
                    if (taskArrayElement.id == item.getAttribute('data-id')) {
                        localTasks.splice(taskArrayIndex, 1)
                    }
                    }
                )

                localStorage.setItem('tasks', JSON.stringify(localTasks));

                // Remove the item when the delete button gets clicked
                item.remove();
                }
            )
            }
        )
    }
}

// Test values
// addTask("Exercise", "Too Easy", 777, 777, 777); 

// Call displayTask function see previous entries when page loads
displayTasks()