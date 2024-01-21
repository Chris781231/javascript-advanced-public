/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-parens */
const localDb = {
    getItem(key) {
        const value = localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(value);
    },
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
};

const dayNameElement = document.querySelector('#dayName');
const dateElement = document.querySelector('#date');
const newTodoItemElement = document.querySelector('#newTodoInput');
const newTodoBtnElement = document.querySelector('#newTodoBtn');
const pendingCountElement = document.querySelector('#pendingCount');
const pendingElements = document.querySelector('#pendingTodos');
const completedSection = document.querySelector('#completed');
const completedPercentElement = document.querySelector('#completedPercent');
const completedElements = document.querySelector('#completedTodos');
const noTaskElement = document.querySelector('#noTask');
const showHideCompleteTodosElement = document.querySelector('#complete');
const clearAllElement = document.querySelector('#clearAll');

let todos = [];

// Initialize app
const init = () => {
  setDateSection();
  setEventListeners();
  loadExistingTodos();
};

// Show date
const setDateSection = () => {
    const now = new Date();
    const date = {
        dayName: Intl.DateTimeFormat('hu-HU', {
            weekday: 'long',
        }).format(now),
        date: Intl.DateTimeFormat('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).format(now),
    };

    dayNameElement.textContent = date.dayName;
    dateElement.textContent = date.date;
};

// Load existing todos
const loadExistingTodos = () => {
    const savedTodos = localDb.getItem('todos');

    if (savedTodos) todos = savedTodos;

    if (todos && Array.isArray(todos)) todos.forEach(todo => showTodo(todo));

    updatePendingCount();
};

// EventListeners
const setEventListeners = () => {
    newTodoBtnElement.addEventListener('click', addTodoHandler);
    showHideCompleteTodosElement.addEventListener('click', toggleCompleteHandler);
    clearAllElement.addEventListener('click', removePendingTodos);
};

const showTodo = (todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('row', 'mt-2', 'fs-5', `${todo.completed ? 'bg-white' : 'bg-secondary-subtle'}`);
    todoItem.setAttribute('data-todoid', todo.id);

    if (todo.completed) {
        completedElements.appendChild(todoItem);
    } else {
        pendingElements.appendChild(todoItem);
    }

    todoItem.innerHTML = `
        <input type="checkbox" class="col-1 m-2" style="width: 25px;" ${todo.completed ? 'checked' : ''}>
        <span class="col p-2 ${todo.completed ? 'text-decoration-line-through .text-secondary-emphasis' : ''}">${todo.todo}</span>
        <button class="col-2 btn btn-danger text-light"><img src="images/trash-solid.svg" width="20"></button>
    `;

    const checkbox = todoItem.querySelector('input');
    checkbox.addEventListener('change', toggleTodoCompleted);

    const delBtn = todoItem.querySelector('button');
    delBtn.addEventListener('click', deleteTodo);
};

const toggleTodoCompleted = (event) => {
    const checkbox = event.currentTarget;
    const checkboxParent = checkbox.parentElement;
    const todoId = checkboxParent.getAttribute('data-todoid');
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (checkbox.checked) {
        completedElements.appendChild(checkboxParent);
    } else {
        pendingElements.appendChild(checkboxParent);
    }

    todos[todoIndex].completed = !(todos[todoIndex].completed);
    localDb.setItem('todos', todos);
    updatePendingCount();
    updateCompletedPercent();
};

const deleteTodo = (event) => {
    const button = event.currentTarget;
    const buttonParent = button.parentElement;
    const todoId = buttonParent.getAttribute('data-todoid');
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    buttonParent.parentElement.removeChild(buttonParent);
    todos.splice(todoIndex, 1);
    localDb.setItem('todos', todos);
    updatePendingCount();
    updateCompletedPercent();
};

// Add new Todo
const addTodoHandler = () => {
    const { value } = newTodoItemElement;
    if (value === '') return;

    const newTodo = {
        id: `todo-${new Date().getTime()}`,
        todo: value,
        completed: false,
    };

    todos.push(newTodo);
    localDb.setItem('todos', todos);

    showTodo(newTodo);
    updatePendingCount();
    updateCompletedPercent();

    newTodoItemElement.value = '';
};

// Toggle completed Todos show
const toggleCompleteHandler = () => {
  showHideCompleteTodosElement.textContent = showHideCompleteTodosElement.textContent.startsWith('Show') ? 'Hide Completed' : 'Show Completed';
  completedSection.classList.toggle('d-none');
};

// Clear all pending todos
const removePendingTodos = () => {};

const updatePendingCount = () => {
    const pendingCount = todos.filter(todo => !todo.completed).length;
    if (pendingCount > 0) {
        pendingCountElement.innerHTML = `<span>You have ${pendingCount} pending item${pendingCount > 1 ? 's' : ''}</span>`;
        noTaskElement.classList.add('d-none');
    } else {
        pendingCountElement.innerHTML = '';
        noTaskElement.classList.remove('d-none');
    }
};

const updateCompletedPercent = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    const completedPercent = Math.round((completedCount / todos.length) * 100);
    completedPercentElement.innerHTML = `<p class="mt-4">Completed tasks: ${completedPercent}%</p>`;
};

init();
