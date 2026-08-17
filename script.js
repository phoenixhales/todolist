// Get elements from HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");


// Get saved tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when the page loads
displayTasks();


// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);


// Also allow user to press Enter
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Function to add a new task
function addTask() {

    // Get the value from the input
    const taskText = taskInput.value.trim();


    // Check if input is empty
    if (taskText === "") {

        errorMessage.textContent = "Please enter a task.";

        return;
    }


    // Remove error message
    errorMessage.textContent = "";


    // Create a new task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };


    // Add task to the array
    tasks.push(newTask);


    // Save tasks
    saveTasks();


    // Display tasks
    displayTasks();


    // Clear input
    taskInput.value = "";

    // Put cursor back inside input
    taskInput.focus();
}


// Function to display all tasks
function displayTasks() {

    // Clear existing tasks
    taskList.innerHTML = "";


    // Check if there are no tasks
    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }


    // Loop through all tasks
    tasks.forEach(function(task) {

        // Create list item
        const li = document.createElement("li");

        li.className = "task-item";


        // Add completed class if task is completed
        if (task.completed) {
            li.classList.add("completed");
        }


        // Create left section
        const leftSection = document.createElement("div");

        leftSection.className = "task-left";


        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // When checkbox is clicked
        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Create task text
        const text = document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        // Put checkbox and text inside left section
        leftSection.appendChild(checkbox);

        leftSection.appendChild(text);


        // Create buttons section
        const buttons = document.createElement("div");

        buttons.className = "task-buttons";


        // Create Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";


        // Edit task
        editButton.addEventListener("click", function() {

            editTask(task.id);

        });


        // Create Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        // Delete task
        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Add buttons
        buttons.appendChild(editButton);

        buttons.appendChild(deleteButton);


        // Add everything to list item
        li.appendChild(leftSection);

        li.appendChild(buttons);


        // Add task to task list
        taskList.appendChild(li);

    });


    // Update task numbers
    updateTaskCount();
}


// Function to mark task as completed
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    // Save updated tasks
    saveTasks();


    // Display tasks again
    displayTasks();
}


// Function to edit a task
function editTask(id) {

    // Find the task
    const task = tasks.find(function(task) {

        return task.id === id;

    });


    // If task doesn't exist
    if (!task) {
        return;
    }


    // Ask user for new task
    const newText = prompt("Edit your task:", task.text);


    // If user cancels
    if (newText === null) {
        return;
    }


    // Remove unnecessary spaces
    const cleanText = newText.trim();


    // Validate the new task
    if (cleanText === "") {

        alert("Task cannot be empty.");

        return;
    }


    // Update task
    task.text = cleanText;


    // Save changes
    saveTasks();


    // Display tasks
    displayTasks();
}


// Function to delete a task
function deleteTask(id) {

    // Ask for confirmation
    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );


    // Stop if user clicks Cancel
    if (!confirmDelete) {
        return;
    }


    // Remove the task
    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    // Save changes
    saveTasks();


    // Display tasks
    displayTasks();
}


// Function to update task count
function updateTaskCount() {

    // Total number of tasks
    taskCount.textContent = tasks.length;


    // Count completed tasks
    const completedTasks = tasks.filter(function(task) {

        return task.completed === true;

    });


    completedCount.textContent = completedTasks.length;
}


// Function to save tasks to Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}