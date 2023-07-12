const todoList = document.querySelector('#todo__list');
const todoForm = document.querySelector('#todo__list-form');
const scrollIcon = document.querySelector('#todo__scroll-icon');
const totalTasks = document.querySelector('#todo__tasks-total-number');

//fetch todo API
async function fetchData() {
    try {
        let response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data
    } catch (error) {
        console.log('Fail to fetch todo list:', error);
    }
}

//Load display
async function renderTodoList() {
    const data = await fetchData();
    const dataDeepCopy = JSON.parse(JSON.stringify(data))
    console.log(dataDeepCopy);

    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    if (hours < 10) {
        hours = '0' + hours;
    };

    if (minutes < 10) {
        minutes = '0' + minutes;
    };
    let timeString = hours + ':' + minutes;

    dataDeepCopy.todos.forEach(todoItem => {
        todoForm.innerHTML += `
        <li class="todo__list-item">
        <input type="checkbox" class="todo__list-check" name="" id="" ${todoItem.completed ? 'checked' : "" }> 
        <span class="todo__list-text">${todoItem.todo}</span>
        <span class="todo__list-time">${timeString}</span>
        </li>
        `
    });
    const totalItems = document.querySelectorAll('.todo__list-item');
    totalTasks.textContent = `${totalItems.length}`;
}
document.addEventListener('DOMContentLoaded', renderTodoList);

//add new todo 
function newTodo() {
    let totalItemsUpdate = document.querySelectorAll('.todo__list-item');
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
        scrollIcon.style.display = 'block';
    };
    totalTasks.textContent = `${totalItemsUpdate.length + 1}`;
}
document.querySelector("#todo__add-button").addEventListener("click", newTodo);

//scroll icon update
function scrollEvent() {
    const { scrollTop, scrollHeight, clientHeight } = document.querySelector('#todo__list');
    if (clientHeight + scrollTop >= scrollHeight) {
        console.log('牛肉');
        document.querySelector('#todo__bottom-icon').style.height = '3px';
        scrollIcon.style.display = 'none';
    } else {
        document.querySelector('#todo__bottom-icon').style.height = '0px';
        scrollIcon.style.display = 'block';
    }
};
document.querySelector('#todo__list').addEventListener('scroll', scrollEvent);
