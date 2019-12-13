// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let list;
const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];
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

localStorage.setItem('todos', JSON.stringify(todosArray));
const data = JSON.parse(localStorage.getItem('todos'));

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  prepareInitialList();
}

function prepareDOMElements() {
  // To będzie idealne miejsce do pobrania naszych elementów z drzewa DOM i zapisanie ich w zmiennych
  list = document.getElementById('list');
  modal = document.querySelector(".modal");
  modalClose = document.querySelector(".close"); 
  modalClose2 = document.querySelector("#cancelTodo");
  editList = document.querySelector("#acceptTodo");
  modalInput = document.getElementById('popupInput');
  mainInput = document.getElementById('myInput');
  addItem = document.getElementById('addTodo'); // do serwera wylaczyc
  form = document.getElementById('addForm')
}

function prepareDOMEvents() {
  // Przygotowanie listenerów
  list.addEventListener('click', listClickManager);
  // addItem.addEventListener('click', addNewElementToList);
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
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
  data.forEach(todo=> {
    addNewElementToList(todo);
  })
}

function addNewElementToList(title   /* Title, author, id */) {
  //obsługa dodawanie elementów do listy
  // $list.appendChild(createElement('nowy', 2))
  const newElement = createElement(title);
  list.appendChild(newElement);
  
}

function createElement(title /* Title, author, id */) {
  // Tworzyc reprezentacje DOM elementu return newElement
  currentId++;

  const newElement = document.createElement('li');
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
  const line = document.querySelector('li[data-id="' + currentItem + '"]');
  list.removeChild(line);
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
  
  line2.innerText = popupInput.value;
  modalClosed();
}

function markAsDone() {
  const line3 = document.querySelector('li[data-id="' + currentItem + '"] span');
  line3.classList.add('listCompleted');
 
}

document.addEventListener('DOMContentLoaded', main);