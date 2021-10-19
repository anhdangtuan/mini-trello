let taskInput = document.getElementById('task-value');
let taskClick = document.getElementById('add-task');

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    taskClick.click();
  }
});

taskClick.addEventListener('click', function () {
  if (taskInput.value) {
    addTask(taskInput.value);
  }
  taskInput.value = '';
});

function addTask(taskValue) {
  let task = document.createElement('li');
  task.classList.add('task');
  task.classList.add('fill');
  task.setAttribute('draggable', 'true');
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);

  let taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.innerText = taskValue;

  let trash = document.createElement('div');
  trash.classList.add('trash');
  trash.innerHTML = '<i class="fas fa-window-close"></i>';
  trash.addEventListener('click', removeTask);

  let edit = document.createElement('div');
  edit.classList.add('edit');
  edit.innerHTML = '<i class="fas fa-edit"></i>';
  edit.addEventListener('click', editTask);

  let moveButtons = document.createElement('div');
  moveButtons.classList.add('button-group');
  let backlogButton = document.createElement('button');
  backlogButton.innerHTML = 'Log';
  backlogButton.addEventListener('click', moveTaskToBacklog);
  let inProgressButton = document.createElement('button');
  inProgressButton.innerHTML = 'Progress';
  inProgressButton.addEventListener('click', moveTaskToInProgress);
  let reviewButton = document.createElement('button');
  reviewButton.innerHTML = 'Review';
  reviewButton.addEventListener('click', moveTaskToReview);
  let doneButton = document.createElement('button');
  doneButton.innerHTML = 'Done';

  doneButton.addEventListener('click', moveTaskToDone);
  moveButtons.appendChild(backlogButton);
  moveButtons.appendChild(inProgressButton);
  moveButtons.appendChild(reviewButton);
  moveButtons.appendChild(doneButton);

  task.appendChild(taskContent);
  task.appendChild(trash);
  task.appendChild(edit);
  task.appendChild(moveButtons);

  let tasks = document.getElementById('tasks-added');
  tasks.insertBefore(task, tasks.childNodes[0]);
}

function removeTask(event) {
  let tasks = event.target.parentNode.parentNode.parentNode;
  let task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
}

function editTask(event) {
  let contentElement = event.target.parentNode.parentNode.childNodes[0];
  let oldContent = contentElement.innerHTML;
  contentElement.innerHTML = null;

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('value', `${oldContent}`);
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      contentElement.innerHTML = event.target.value;
    }
  });

  contentElement.appendChild(input);
}

function moveTaskToBacklog(event) {
  let tasks = event.target.parentNode.parentNode.parentNode;
  let task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
  let backLog = document.getElementById('tasks-added');
  backLog.append(task);
}

function moveTaskToInProgress(event) {
  let tasks = event.target.parentNode.parentNode.parentNode;
  let task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
  let progress = document.getElementById('tasks-in-progress');
  progress.append(task);
}

function moveTaskToReview(event) {
  let tasks = event.target.parentNode.parentNode.parentNode;
  let task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
  let review = document.getElementById('tasks-review');
  review.append(task);
}

function moveTaskToDone(event) {
  let tasks = event.target.parentNode.parentNode.parentNode;
  let task = event.target.parentNode.parentNode;
  tasks.removeChild(task);
  let done = document.getElementById('tasks-done');
  done.append(task);
}

let task;

function dragStart(event) {
  event.target.classList.add('hold');
  task = event.target;
  setTimeout(function () {
    event.target.classList.add('invisible');
  }, 0);
}

function dragEnd(event) {
  event.target.classList.remove('invisible');
}

function dragEnter(event) {
  if (event.target.classList.contains('dropzone')) {
    event.target.classList.add('hovered');
  }
}

function dragOver(event) {
  event.preventDefault(); // https://stackoverflow.com/a/35428657
}

function dragLeave(event) {
  event.target.classList.remove('hovered');
}

function dragDrop(event) {
  event.target.classList.remove('hovered');
  // event represents the column
  // Add the task to the right child.
  // Inspect the element to find the ul is index 3 in child nodes.
  event.target.childNodes[3].append(task);
}

let dropzones = document.getElementsByClassName('dropzone');

for (let index = 0; index < dropzones.length; index++) {
  const dropzone = dropzones[index];
  dropzone.addEventListener('dragenter', dragEnter);
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('dragleave', dragLeave);
  dropzone.addEventListener('drop', dragDrop);
}