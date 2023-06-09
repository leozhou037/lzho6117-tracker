////////////////////////
// Display time and date
////////////////////////

const date = new Date();

// Get time and date values
let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) // Display time in 12 hour
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear().toString().substring(2); // Only display last 2 digits of the year

// Date Format
let currentDate = `${time} - ${day}/${month}/${year}`;

/////////////////////////////////
// Array to store user input data
/////////////////////////////////

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

//////////////////////////////
// Add input values into array
//////////////////////////////

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
    
    // Close the modal when submit button is pressed
    inputModal.close();
    }
)

///////////////////////////////////////////////////////////////
// Object to map each muscle group to a corresponding image URL
///////////////////////////////////////////////////////////////

const muscleGroupLogo = {
    "Chest": "images/chest.png",
    "Back": "images/back.png",
    "Arms": "images/arm.png",
    "Shoulders": "images/shoulders.png",
    "Abdominals": "images/abs.png",
    "Legs": "images/legs.png",
};

///////////////////////////////////////
// Display data from array in task list
///////////////////////////////////////

// Variable for DOM selection of HTML elements
const tasklistElem = document.querySelector('#tasklist');

function displayTasks() {
    tasklist.innerHTML = "";

    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    if (localTasks !== null) {
        localTasks.forEach((task) => {

            // Log each task in the console
            console.log(task);

            // Create summarised task items for the DOM and add to the list
            let item = document.createElement('li');
            item.setAttribute('data-id', task.id);
            item.innerHTML = `
                <figure>
                    <img src="${muscleGroupLogo[task.type]}" alt="${task.type}">
                </figure>
                
                <h1>
                    <strong>${task.name}</strong>
                </h1>

                <h2>
                    ${task.type}
                </h2>

                <h2>
                    <strong>${task.date}</strong> 
                </h2>
            `;
            tasklistElem.appendChild(item);

            /////////////////////////////////////////////////////////////////////////////
            // Create dialog element for each list item containing full list of task data
            /////////////////////////////////////////////////////////////////////////////

            let moreModal = document.createElement('dialog');
            moreModal.innerHTML = `
            <figure>
                <img src="${muscleGroupLogo[task.type]}" alt="${task.type}">
            </figure>

            <h1>
            <strong>${task.name}</strong>
            </h1>

            <h2>
                ${task.type} 
            </h2>
            
            <h2>
                <strong>${task.date}</strong>
            </h2>

            <h3>
                <strong>${task.weight}</strong>${task.weightMeasurement} 
                <br>
                <strong>${task.reps} </strong> Reps × <strong>${task.sets}</strong> Sets
            </h3>

            <p>
                <strong>Goal:</strong> <br>
                ${task.goal} 
                <br>
                <br>
                <strong>Difficulty:</strong> 
                <br>
                ${task.difficulty} 
                <br>
                <br>
                <strong>Note:</strong> 
                <br>${task.note}
            </p>
            `;
            item.appendChild(moreModal);

            //////////////////////////////////////////////////////////////////////////////////////////////
            // Create 'view more' button for each list item that is created, to open the 'view more' modal
            //////////////////////////////////////////////////////////////////////////////////////////////  

            let moreButton = document.createElement('button');
            let moreButtonText = document.createTextNode('VIEW MORE');
            moreButton.appendChild(moreButtonText);
            item.appendChild(moreButton);

            // Event listener to show the 'view more' modal when the 'view more' button is clicked
            moreButton.addEventListener('click', () => {
                moreModal.showModal();
                }
            );

            //////////////////////////////////////////////////////////
            // Create delete button for each list item that is created
            //////////////////////////////////////////////////////////

            let delButton = document.createElement('button');
            delButton.id = 'delete-button';
            let delButtonText = document.createTextNode('DELETE EXERCISE');
            delButton.appendChild(delButtonText);
            moreModal.appendChild(delButton);

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

            ///////////////////////////////////////////////////
            // Create a close button inside the view more modal
            ///////////////////////////////////////////////////

            let closeMoreModal = document.createElement('button');
            closeMoreModal.id = 'close-button';
            let closeMoreModalText = document.createTextNode('CLOSE');
            closeMoreModal.appendChild(closeMoreModalText);
            moreModal.appendChild(closeMoreModal);

            // Event listener to close the view more modal when clicked
            closeMoreModal.addEventListener('click', () => {
                moreModal.close();
                }
            );

            // Close modal when clicking outside
            // Reference: https://blog.webdevsimplified.com/2023-04/html-dialog/
            moreModal.addEventListener("click", e => {
                const dialogDimensions = moreModal.getBoundingClientRect()
                if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
                ) {
                    moreModal.close()
                    }
                }
            );
            
            // Clear form inputs after task gets displayed
            form.reset(); 
            }
        )
    }
}

// Call displayTask function see previous entries when page loads
displayTasks();

///////////////////
// Input Form Modal
///////////////////

// Variable for DOM selection of HTML elements
const inputModal = document.querySelector("#input-modal");

// Event listener to show modal when button is clicked
const openInputModal = document.querySelector("#open-input-modal");

openInputModal.addEventListener("click", () => {
    inputModal.showModal();
}
)

// Event listener to close modal when close button is clicked
const closeInputModal = document.querySelector("#close-input-modal");

closeInputModal.addEventListener("click", () => {
    inputModal.close();

    // Clear form inputs when submit button is pressed
    form.reset(); 
}
)

// Close modal when clicking outside
// Reference: https://blog.webdevsimplified.com/2023-04/html-dialog/
inputModal.addEventListener("click", e => {
    const dialogDimensions = inputModal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
        inputModal.close()

    // Clear form inputs when modal is closed
    form.reset(); 
    }
  })

// Only show 'add exercise'/'open input modal' button once the user scrolls past the landing page
// Reference: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("open-input-modal").style.display = "block";
    } else {
    document.getElementById("open-input-modal").style.display = "none";
    }
}