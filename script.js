const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((taskText) => {
    createTaskElement(taskText);
  });
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTasksToLocalStorage();

  taskInput.value = '';
}

function createTaskElement(taskText) {
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete" onclick="removeTask(this)">Delete</button>
  `;

  taskList.appendChild(taskItem);
}

function removeTask(deleteButton) {
  const taskItem = deleteButton.parentNode;
  taskList.removeChild(taskItem);
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.querySelectorAll('.task-text')).map((task) => task.innerText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
