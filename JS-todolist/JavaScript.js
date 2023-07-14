const todoList = document.querySelector('#todo__list');
const todoForm = document.querySelector('#todo__list-form');
const scrollIcon = document.querySelector('#todo__scroll-icon');
const scrollIconBottom = document.querySelector('#todo__bottom-icon');
const totalTasks = document.querySelector('#todo__tasks-total-number');

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
        console.error('Fail to fetch todo list:', error);
    }
}

//is local storage empty ? fetch api : loading todoList
async function todoListAPI() {
    const localTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (localTodos.length === 0) {
        const data = await fetchData();
        const dataDeepCopy = JSON.parse(JSON.stringify(data));
        let filterData = dataDeepCopy.todos;
        filterData.map(item => item.id += Date.now().toString()) 
        apiList = [...filterData, ...localTodos];
        localStorage.setItem('todos', JSON.stringify(apiList));
    } 
}

//total tasks
function totalItemsUpdate() {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
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
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (inputString.value !== '') {
        const newTodo = [{
            'id': `${(Date.now().toString())}`,
            'completed': false,
            'todo': `${inputString.value}`,
            'time': `${timeUpdate()}`,
        }];
        newList = [...newTodo, ...localTodos];
        localStorage.setItem('todos', JSON.stringify(newList));
    };

    updateDisplay();
    inputString.value = '';
}

//delete todolist funciton & local strage
function deleteTodo(todoId) {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    deleteList = localTodos.filter(item => `${item.id}` !== `${todoId}`);
    localStorage.setItem('todos', JSON.stringify(deleteList));
}

//update display
function updateDisplay() {
    todoForm.innerHTML = '';
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    localTodos.forEach(todoItem => {
        todoForm.innerHTML += `
        <li class="todo__list-item" id="${todoItem.id}">
        <input type="checkbox" class="todo__list-check" name="" id="" ${todoItem.completed ? 'checked' : ""}> 
        <input type="text" class="todo__list-input" name="" id=""> 
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
    const targetClass = p.target.className;

    switch (targetClass) {
        case 'todo__list-delete':
            deleteTodo(p.target.parentNode.id);
            updateDisplay();

            break;
        case 'todo__list-check':
            checkTodo(p.target);

            break;
        default:

            break;
        }
}

//
function listEditor(p) {
    const targetClass = p.target.className;

    switch (targetClass) {
        case 'todo__list-text':
            console.log(targetClass);
            console.log(p.target.innerText);
            console.log(p.target.parentNode.querySelector('.todo__list-input'));
            p.target.parentNode.querySelector('.todo__list-input').style.display = 'block';
            
            break;
        default:

            break;
    }
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

//check function
function checkTodo(p) {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    const chekItem = p.parentNode.id
    localTodos.forEach(item => {
        if( `${item.id}` === `${chekItem}` ){
            item.completed = p.checked ;
        }
    });
    localStorage.setItem('todos', JSON.stringify(localTodos))
}


//scroll icon update
function scrollIconDisplay() {
    const { scrollTop, scrollHeight, clientHeight } = document.querySelector('#todo__list');
    scrollIconBottom.style.height = '0px'
    scrollIcon.style.display = 'none';

    if (scrollHeight > clientHeight) {

        //is client scroll to bottom ? display bottom line : display icon 
        if (clientHeight + scrollTop >= scrollHeight - 5) {
            scrollIconBottom.style.height = '3px';
            scrollIcon.style.display = 'none';
        } else {
            scrollIconBottom.style.height = '0px';
            scrollIcon.style.display = 'block';
        }
    }

}

document.addEventListener('DOMContentLoaded', renderTodoList);
document.querySelector("#todo__add-button").addEventListener("click", newTodo);
document.querySelector('#todo__list').addEventListener('scroll', scrollIconDisplay);
document.querySelector('#todo__list-form').addEventListener('click', listEventHandler);
document.querySelector('#todo__list-form').addEventListener('dblclick', listEditor);