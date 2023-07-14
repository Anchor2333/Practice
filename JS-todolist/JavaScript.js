const todoList = document.querySelector('#todo__list');
const todoForm = document.querySelector('#todo__list-form');
const scrollIcon = document.querySelector('#todo__scroll-icon');
const totalTasks = document.querySelector('#todo__tasks-total-number');
let localTodos = JSON.parse(localStorage.getItem('todos')) || [];

//fetch todos API
async function fetchData() {
    try {
        let response = await fetch('https://dummyjson.com/todos');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('Fail to fetch todo list:', error);
    }
}

//is local storage empty ? fetch api : loading todoList
async function todoListAPI() {
    const data = await fetchData();
    const dataDeepCopy = JSON.parse(JSON.stringify(data));

    if (localTodos.length === 0) {
        let filterData = dataDeepCopy.todos;
        localTodos = localTodos.concat(filterData);
    } else {
        localTodos = JSON.parse(localStorage.getItem('todos'));
    }    
    localStorage.setItem('todos', JSON.stringify(localTodos));
}

//total tasks
function totalItemsUpdate() {
    totalTasks.textContent = `${localTodos.length}`;
}

//render todolist
async function renderTodoList() {
    await todoListAPI();
    updateDisplay();
}

//add new todo 
function newTodo() {
    const inputString = document.querySelector('#todo__input-text');

    if (inputString.value !== '') {
        const newTodo = [{
            'id' : `${(Date.now().toString())}`,
            'completed' : false,
            'todo' : `${inputString.value}`,
            'time' : `${timeUpdate()}`,
        }]
        localTodos = localTodos.concat(newTodo);
        localStorage.setItem('todos', JSON.stringify(localTodos));
    };
    updateDisplay();
    inputString.value = '';
}

//delete todolist funciton & local strage
function deleteTodo(todoId) {
    localTodos = localTodos.filter(item => item.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(localTodos));
}

//update display
function updateDisplay() {
    todoForm.innerHTML = '';
    localTodos = JSON.parse(localStorage.getItem('todos'));
    localTodos.forEach(todoItem => {
        todoForm.innerHTML += `
        <li class="todo__list-item" id="${todoItem.id.length < 13 ? (Date().toString()) : todoItem.id }">
        <input type="checkbox" class="todo__list-check" name="" id="" ${todoItem.completed ? 'checked' : ""}> 
        <span class="todo__list-text">${todoItem.todo}</span>
        <span class="todo__list-time">${todoItem.time ? todoItem.time : timeUpdate()}</span>
        <a class="todo__list-delete">X</a>
        </li>
        `
    });
    totalItemsUpdate();
    scrollIconDisplay();
}

//click list event handler
function listEventHandler(p) {
    const targetClass = p.target.className
    switch (targetClass) {
        case 'todo__list-delete':
            deleteTodo(p.target.parentNode.id);
            break;
        case 'todo__list-check':
            storeLocalstorage();
            break;
        case 'todo__list-text':
            console.log(1);
            break;
        default:
            break;
    }
    updateDisplay();
}

//time update
function timeUpdate() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    if (hours < 10) {
        hours = '0' + hours;
    };

    if (minutes < 10) {
        minutes = '0' + minutes;
    };
    let timeString = hours + ':' + minutes;
    return timeString;
}

//local storage update
function storeLocalstorage() {
    const todoList = Array.from(document.querySelectorAll('.todo__list-item')).map(todo => {
        return {
            'id': todo.id,
            'todo': todo.querySelector('.todo__list-text').innerText,
            'completed': todo.querySelector('.todo__list-check').checked,
            'time': todo.querySelector('.todo__list-time').innerText
        };
    });
    localStorage.setItem('todos', JSON.stringify(todoList));
}

//scroll icon update
function scrollIconDisplay() {
    const { scrollTop, scrollHeight, clientHeight } = document.querySelector('#todo__list');
    let scrollIconBottom = document.querySelector('#todo__bottom-icon');
    scrollIconBottom.style.height = '0px'
    scrollIcon.style.display = 'none';
    
    if (scrollHeight > 460 ) {

        if (clientHeight + scrollTop >= scrollHeight -5) {
            scrollIconBottom.style.height = '3px';
            scrollIcon.style.display = 'none';
        } 

        if (clientHeight + scrollTop < scrollHeight - 5) {
            scrollIconBottom.style.height = '0px';
            scrollIcon.style.display = 'block';
        }
    } 
    
}
    
document.addEventListener('DOMContentLoaded', renderTodoList);
document.querySelector("#todo__add-button").addEventListener("click", newTodo);
document.querySelector('#todo__list').addEventListener('scroll', scrollIconDisplay);
document.querySelector('#todo__list-form').addEventListener('click', listEventHandler)