"use strict";

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const getLocalStorage = () => (JSON.parse(localStorage.getItem('toDoData')) || []);

const putLocalStorage = (toDoData) => localStorage.setItem('toDoData', JSON.stringify(toDoData));

const render = () => {
  const toDoData = getLocalStorage();

  todoCompleted.innerHTML = '';
  todoList.innerHTML = '';

  toDoData.forEach((item, index) => {
    const li = document.createElement('li');

    li.classList.add('todo-item');
    li.innerHTML = `
    <span class="text-todo">${item.text}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>    
    `;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-complete').addEventListener('click', () => {
      item.completed = !item.completed;
      putLocalStorage(toDoData);
      render();
    });
    li.querySelector('.todo-remove').addEventListener('click', () => {
      toDoData.splice(index, 1);
      putLocalStorage(toDoData);
      render();
    });

  });
};

todoControl.addEventListener('submit', function (event) {
        event.preventDefault();

        if (headerInput.value.trim()) {
            const toDoData = getLocalStorage();

            const newToDo = {
                text: headerInput.value,
                completed: false,
            };
            toDoData.push(newToDo);
            putLocalStorage(toDoData);

            headerInput.value = '';
            render();
        }
    });

window.addEventListener('storage', function () { render(); });

render();