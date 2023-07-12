const todoList = document.querySelector('#todo__list');
const todoForm = document.querySelector('#todo__list-form');
const scrollIcon = document.querySelector('#todo__scroll-icon');
const totalTasks = document.querySelector('#todo__tasks-total-number');
let localTodos = JSON.parse(localStorage.getItem('todos')) || [];

/*
//fetch todos API
async function fetchData() {
    try {
        let response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.log('Fail to fetch todo list:', error);
    }
}

async function fetchStorage() {
    const data = await fetchData();
    const dataDeepCopy = JSON.parse(JSON.stringify(data));
    console.log(dataDeepCopy);
    const filterData =  dataDeepCopy.todos.filter(data => data.todo !== localTodos.todo);
    localTodos.concat(filterData);
}
*/

//render todolist
function renderTodoList() {
    localTodos.forEach(todoItem => {
        todoForm.innerHTML += `
        <li class="todo__list-item" id="${todoItem.id}">
        <input type="checkbox" class="todo__list-check" name="" id="" ${todoItem.completed ? 'checked' : "" }> 
        <span class="todo__list-text">${todoItem.todo}</span>
        <span class="todo__list-time">${timeUpdate()}</span>
        <a class="todo__list-delete">X</a>
        </li>
        `
        document.querySelector(".todo__list-delete").addEventListener("click", deleteTodo);
    });
    const totalItems = document.querySelectorAll('.todo__list-item');
    totalTasks.textContent = `${totalItems.length}`;
}
document.addEventListener('DOMContentLoaded', function() {
    // fetchStorage();
    renderTodoList();    
});

//add new todo 
function newTodo() {
    let totalItemsUpdate = document.querySelectorAll('.todo__list-item');
    let inputString = document.querySelector('#todo__input-text');
    const totalItems = document.querySelectorAll('.todo__list-item');

    if (inputString.value !== '') {
        todoForm.innerHTML += `
        <li class="todo__list-item" id="${Date.now().toString()}">
        <input type="checkbox" class="todo__list-check" name="" id=""> 
        <span class="todo__list-text">${inputString.value}</span>
        <span class="todo__list-time">${timeUpdate()}</span>
        <a class="todo__list-delete">X</a>
        </li>
        `
    };
    inputString.value = '';
    
    if (todoList.scrollHeight > todoList.clientHeight) {
        scrollIcon.style.display = 'block';
    };
    totalTasks.textContent = `${totalItemsUpdate.length + 1}`;
    updateLocalstorage();
}
document.querySelector("#todo__add-button").addEventListener("click", newTodo);

//delete todolist funciton & local strage
function deleteTodo() {
    console.log('123');
    /*
    localStorage.removeItem(target.id)
    let totalItemsUpdate = document.querySelectorAll('.todo__list-item');
    totalTasks.textContent = `${totalItemsUpdate.length}`;
    */
   renderTodoList();
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

//local storage upadte
function updateLocalstorage() {
    const todos = Array.from(document.querySelectorAll('.todo__list-item')).map(todo =>{
        return {
            'id' : todo.id,
            'todo' : todo.querySelector('.todo__list-text').innerText,
            'completed' : todo.querySelector('.todo__list-check').checked,
            'time' : todo.querySelector('.todo__list-time').innerText
        };
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

//scroll icon update
function scrollEvent() {
    const { scrollTop, scrollHeight, clientHeight } = document.querySelector('#todo__list');
    if (clientHeight + scrollTop >= scrollHeight - 5) {
        document.querySelector('#todo__bottom-icon').style.height = '3px';
        scrollIcon.style.display = 'none';
    } else {
        document.querySelector('#todo__bottom-icon').style.height = '0px';
        scrollIcon.style.display = 'block';
    }
};
document.querySelector('#todo__list').addEventListener('scroll', scrollEvent);
