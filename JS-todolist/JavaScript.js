const todoList = document.querySelector('#todo__list');
const todoForm = document.querySelector('#todo__list-form');
const scrollIcon = document.querySelector('#todo__scroll-icon');
const totalTasks = document.querySelector('#todo__tasks-total-number');

function newTodo() {
    let listItems = document.querySelectorAll('.todo__list-item');
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    
    if (hours < 10) {
        hours = '0' + hours;
    };
    
    if (minutes < 10) {
        minutes = '0' + minutes;
    };
    
    let timeString = hours + ':' + minutes;
    let inputString = document.querySelector('#todo__input-text'); 
    
    if (inputString.value !== '') {
        todoForm.innerHTML += `
        <li class="todo__list-item">
        <input type="checkbox" class="todo__list-check" name="" id=""> 
        <span class="todo__list-text">${inputString.value}</span>
        <span class="todo__list-time">${timeString}</span>
        </li>
        `
    };

    inputString.value = '';
    
    if (todoList.scrollHeight > todoList.clientHeight) {
        scrollIcon.style.display =  'block';
    };

    totalTasks.textContent = `${ listItems.length + 1 }`;
}

document.querySelector("#todo__add-btutton").addEventListener("click", newTodo);

function scrollEvent() {
    console.log('牛肉')
};

document.querySelector('#todo__list').addEventListener('scroll', scrollEvent);