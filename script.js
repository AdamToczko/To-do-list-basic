let list;
const initialList = [];
let modal;
let modalClose; 
let modalClose2;
let editList;
let modalInput;
let okModalButton;
let mainInput;
let addItem;
let form;
let currentId = 0;
let currentItem;
let todosArray = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const data = JSON.parse(localStorage.getItem('todos'));

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  prepareInitialList();
}

function prepareDOMElements() {
 
  list = document.getElementById('list');
  modal = document.querySelector(".modal");
  modalClose = document.querySelector(".close"); 
  modalClose2 = document.querySelector("#cancelTodo");
  editList = document.querySelector("#acceptTodo");
  modalInput = document.getElementById('popupInput');
  mainInput = document.getElementById('myInput');
  addItem = document.getElementById('addTodo'); 
  form = document.getElementById('addForm')
  
}


function prepareDOMEvents() {
  list.addEventListener('click', listClickManager);
  form.addEventListener('submit', addNewItemViaForm);
  modalClose.addEventListener('click', modalClosed);
  modalClose2.addEventListener('click', modalClosed2);
  editList.addEventListener('click', editAccept);
}

function addNewItemViaForm (e) {
  e.preventDefault();
  addNewTodo();
  
}

function addNewTodo() {
  
  if (mainInput.value.trim() !== ''){
    todosArray.push(mainInput.value);
    localStorage.setItem('todos', JSON.stringify(todosArray));
    
    addNewElementToList(mainInput.value);
    mainInput.value = '';
   }
}


function prepareInitialList() {
  data.forEach(todo=> {
    addNewElementToList(todo);
  })
}

function addNewElementToList(title) {
 
  const newElement = createElement(title);
  list.appendChild(newElement);
  
}

function createElement(title) {
  currentId++;


  let newElement = document.createElement('li');
  newElement.dataset.id = currentId;
  const titleElement = document.createElement('span');
  titleElement.innerText = title;
  titleElement.classList.add('task-style')
  newElement.appendChild(titleElement);
  
  const divBtns = document.createElement('div');
  divBtns.classList.add('buttons-style')
  newElement.appendChild(divBtns)

  const editButton = document.createElement('button'); 
  editButton.innerHTML = 'EDIT'; 
  editButton.classList.add('edit','btn','btn-primary','btn-sm')
  divBtns.appendChild(editButton); 

  const deleteButton = document.createElement('button'); 
  deleteButton.innerHTML = 'DELETE'; 
  deleteButton.classList.add('delete','btn','btn-danger','btn-sm')
  divBtns.appendChild(deleteButton); 
  
  const doneButton = document.createElement('button'); 
  doneButton.innerHTML = 'DONE'; 
  doneButton.classList.add('done','btn','btn-secondary','btn-sm')
  divBtns.appendChild(doneButton); 

    return newElement;
}


function listClickManager(event) {

  currentItem = event.target.parentElement.parentElement.dataset.id;

  if (event.target.className === 'delete btn btn-danger btn-sm') {
    
      removeListElement();
  } else if (event.target.className === 'edit btn btn-primary btn-sm'){
      editListElement();
  } else if (event.target.className === 'done btn btn-secondary btn-sm') {
      markAsDone();
  }
}

function removeListElement() {
  console.log(currentItem)
  const removeItem = document.querySelector('li[data-id="' + currentItem + '"]');
  list.removeChild(removeItem);
  const localS = JSON.parse(localStorage.getItem('todos'));
  const operationOnTodos  = localS.splice(currentItem -1, 1)
  localStorage.setItem('todos', JSON.stringify(localS));

}

function editListElement() {
  openPopup();
  text = document.querySelector('li[data-id="' + currentItem + '"] span').textContent;
  popupInput.value = text;

}

function openPopup() {
    modal.style.display = "block";
}

function modalClosed() {
  modal.style.display = "none";
}

function modalClosed2() {
  modal.style.display = "none";
}


function editAccept () {
  
  const editSelected = document.querySelector('li[data-id="' + currentItem + '"] span');
  console.log(currentItem)
  editSelected.innerText = popupInput.value;
  
  const localS = JSON.parse(localStorage.getItem('todos'));
  const operationOnTodos = localS.splice(currentItem -1, 1, popupInput.value)
  localStorage.setItem('todos', JSON.stringify(localS));
  modalClosed();
}

function markAsDone() {
  const markCompleted = document.querySelector('li[data-id="' + currentItem + '"] span');
  markCompleted.classList.add('listCompleted');
 
}

document.addEventListener('DOMContentLoaded', main);