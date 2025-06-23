// UI Element
const form = document.querySelector('form');
const taskInput = document.getElementById('task-input')
const submitBtn = document.getElementById('submitBtn')
const output = document.querySelector('.output')
const taskList = []; //create empty list to add task 
let taskId = 0; //task id to provide a unique id to each task

let editId = null; //declare editId to edit task



// submit form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (editId) {
        updateTask(taskInput.value);
    } else {
        addTask(taskInput.value);
    }
    showTask();
    clearInput();
});


// function to clear input box
function clearInput() {
    taskInput.value = "";
}


// function to add task in taskList
function addTask(task) {
    taskList.push({
        id: ++taskId,
        title: task,
        isCompleted: false,
    });

    c * onsole.log(taskList);
}

function showTask() {
    let html = '';
    taskList.forEach(task => {
        html += `
         <li>
                <div>
                    <label class="complete" data-id="${task.id}">
                    <input type="checkbox" ${task.isCompleted ? "checked" : ""} >
                    <i class="fa-solid fa-check"></i>
                  </label>
                    <p class="${task.isCompleted ? 'completed' :''}">${task.title}</p>

                </div>
               
                <div>
                 <a href="#" class="edit" data-id="${task.id}">Edit</a>
                <a href="#" class="delete" data-id="${task.id}">X</a>
                </div>
            </li>

        `;

    });
    output.innerHTML = html;
}

// MainuplateTask

output.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")) {
        deleteTask(e.target.dataset.id);
    }
    if (e.target.classList.contains("complete")) {
        completeTask(e.target.dataset.id);
    }
    if (e.target.classList.contains("edit")) {
        editTask(e.target.dataset.id);
    }
});
// edit task
function editTask(id) {
    const task = taskList.filter(item => item.id == id)[0];
    taskInput.value = task.title;
    submitBtn.innerText = "Update";
    editId = task.id;
}
// function to update value in list

function updateTask(value) {
    taskList.forEach(task => {
        if (task.id == editId) {
            task.title = value;
        }
    });
    editId = null;
    submitBtn.innerText = "Add";
}


// function to delete task
function deleteTask(id) {
    const task = taskList.filter(item => item.id == id)[0];
    const index = taskList.indexOf(task);
    taskList.splice(index, 1);
    showTask();
}

function completeTask(id) {
    taskList.forEach(task => {
        if (task.id == id) {
            task.isCompleted = !task.isCompleted
        }
    });
    showTask();
}