const tasksList = document.getElementById('lista-tarefas');

function completeTask(e) {
  e.target.classList.toggle('completed');
}

function selectItem(e) {
  const tasks = tasksList.children;
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].style.backgroundColor = 'transparent';
    tasks[i].classList.remove('selected');
  }
  e.target.classList.add('selected');
  e.target.style.backgroundColor = 'gray';
}

function getItems() {
  const items = JSON.parse(localStorage.getItem('lista'));
  tasksList.innerHTML = items;
  for (let i = 0; i < tasksList.children.length; i += 1) {
    tasksList.children[i].addEventListener('click', selectItem);
    tasksList.children[i].addEventListener('dblclick', completeTask);
  }
}

getItems();

function createTask() {
  const str = document.getElementById('texto-tarefa');
  const task = document.createElement('li');
  task.addEventListener('click', selectItem);
  task.addEventListener('dblclick', completeTask);
  task.innerText = str.value;
  tasksList.appendChild(task);
  str.value = '';
}

document.getElementById('criar-tarefa').addEventListener('click', createTask);

function clearAll() {
  tasksList.innerHTML = '';
}

document.getElementById('apaga-tudo').addEventListener('click', clearAll);

function clearComplete() {
  const completed = document.getElementsByClassName('completed');
  const size = completed.length;
  for (let i = 0; i < size; i += 1) {
    document.querySelector('.completed').remove();
  }
}

document.getElementById('remover-finalizados').addEventListener('click', clearComplete);

function setItems() {
  localStorage.setItem('lista', JSON.stringify(tasksList.innerHTML));
}

document.getElementById('salvar-tarefas').addEventListener('click', setItems);

function moveUp() {
  const selected = document.querySelector('.selected');
  if (selected !== null) {
    const element = selected.previousElementSibling;
    if (element !== null) {
      element.insertAdjacentElement('beforebegin', selected);
    }
  }
}

function moveDown() {
  const selected = document.querySelector('.selected');
  if (selected !== null) {
    const element = selected.nextElementSibling;
    if (element !== null) {
      element.insertAdjacentElement('afterend', selected);
    }
  }
}

document.getElementById('mover-cima').addEventListener('click', moveUp);
document.getElementById('mover-baixo').addEventListener('click', moveDown);

function removeSelected() {
  document.querySelector('.selected').remove();
}

document.getElementById('remover-selecionado').addEventListener('click', removeSelected);
