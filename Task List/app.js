// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', removeAll);
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create icon
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';

    // Append the link to li
    li.appendChild(link);

    //Apend li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task');
  } else {

    // Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create icon
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';

    // Append the link to li
    li.appendChild(link);

    //Apend li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';
    const onBlur = new Event('blur');
    taskInput.dispatchEvent(onBlur);

  }

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    const element = e.target.parentElement.parentElement;
    element.remove();
    removeTaskFromLocalStorage(element);
  }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeAll(e) {
  // taskList.innerHTML = '';

  //Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();

  e.preventDefault();
}

function clearTasksFromLocalStorage(){
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}
