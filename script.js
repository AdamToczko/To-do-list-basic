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

function addNewElementToList(title, id, done   /* Title, author, id */) {
 
  const newElement = createElement(title);
  list.appendChild(newElement);
  
}

function createElement(title, /* Title, author, id */) {
  currentId++;


  let newElement = document.createElement('li');
  newElement.dataset.id = currentId;
  const titleElement = document.createElement('span');
  titleElement.innerText = title;
  titleElement.classList.add('todo')
  newElement.appendChild(titleElement);
  
  const divBtns = document.createElement('div');
  divBtns.classList.add('btns')
  newElement.appendChild(divBtns)

  const newButton = document.createElement('button'); // tworzymy nowy button
  newButton.innerHTML = 'edit'; // dodajemy napis w buttonie 'edytuj'
  newButton.classList.add('edit')
  divBtns.appendChild(newButton);  // dodajemy przycisk do naszej komórki   
  
  const newButton2 = document.createElement('button'); // tworzymy nowy button
  newButton2.innerHTML = 'delete'; // dodajemy napis w buttonie delete
  newButton2.classList.add('delete')
  divBtns.appendChild(newButton2);  // dodajemy przycisk do naszej komórki
  
  const newButton3 = document.createElement('button'); // tworzymy nowy button
  newButton3.innerHTML = 'done'; // dodajemy napis w buttonie 'wykonane'
  newButton3.classList.add('done')
  divBtns.appendChild(newButton3);  // dodajemy przycisk do naszej komórki  

    return newElement;
}


function listClickManager(event) {
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
 
  currentItem = event.target.parentElement.parentElement.dataset.id;

  if (event.target.className === 'delete') {
    
      removeListElement();
  } else if (event.target.className === 'edit'){
      editListElement();
  } else if (event.target.className === 'done') {
      markAsDone();
  }
}

function removeListElement() {
  console.log(currentItem)
  const line = document.querySelector('li[data-id="' + currentItem + '"]');
  list.removeChild(line);
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
  
  const line2 = document.querySelector('li[data-id="' + currentItem + '"] span');
  console.log(currentItem)
  line2.innerText = popupInput.value;
  
  const localS = JSON.parse(localStorage.getItem('todos'));
  const operationOnTodos = localS.splice(currentItem -1, 1, popupInput.value)
  localStorage.setItem('todos', JSON.stringify(localS));
  modalClosed();
}

function markAsDone() {
  const line3 = document.querySelector('li[data-id="' + currentItem + '"] span');
  line3.classList.add('listCompleted');
 
}

document.addEventListener('DOMContentLoaded', main);