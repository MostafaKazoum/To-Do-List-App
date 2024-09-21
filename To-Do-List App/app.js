const tasks = [];

const tasksHolder = document.querySelector(".tasks");
const input = document.querySelector(".task-input");
const AddBtn = document.getElementById("Add-task");

function getCurrentTime() {
    return new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0');
}

function triggerTypewriter() {
    const header = document.querySelector('h2');
    header.style.animation = 'none'; // Remove any existing animation
    // Trigger reflow to restart the animation
    header.offsetHeight; 
    header.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite'; // Apply animation
}

window.onload = () => {
    loadTasks();
    triggerTypewriter(); // Initial trigger on page load
}

function loadTasks() {
    tasksHolder.innerHTML = tasks.map((task) => {
        return `
            <div id="task-${task.id}" class="task" style="opacity: ${task.completed ? 0.5 : 1};">
                <label class="info">
                    <input 
                        ${task.completed ? 'checked' : ''} 
                        onclick="check(${task.id})" 
                        id="checkbox-${task.id}" 
                        class="checkbox" 
                        type="checkbox"
                        data-id="${task.id}">
                    <p id="p-${task.id}" class="task-info" style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.task}</p>
                </label>
                <div class="desc">
                    <span class="time">${task.time}</span>
                    <span onclick="deleteTask(${task.id})" id="btn-${task.id}" class="delete"><i class="fa-solid fa-trash-can"></i></span>
                </div>
            </div>`;
    }).join("");
}

function check(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        loadTasks(); // Reload tasks to update UI based on new state
    }
}

function deleteTask(taskId) {
    // Find the index of the task with the given id
    const index = tasks.findIndex(task => task.id === taskId);
    
    // If the task is found, remove it
    if (index !== -1) {
        tasks.splice(index, 1);
        loadTasks(); // Reload tasks to update UI after deletion
    }
}

AddBtn.onclick = () => {
    const newTask = input.value;
    if (newTask.trim() === "") {
        return;
    }

    const task = {
        id: tasks.length + 1,
        task: newTask,
        time: getCurrentTime(),
        completed: false
    }
    
    tasks.push(task);
    loadTasks();
    input.value = "";

    // Trigger the typewriter effect when adding a task
    triggerTypewriter();
}
