loadFromLocalStorage();

function addTodo() {
	const inputTodo = document.getElementById('inputTodo');
	const todoText = inputTodo.value.trim();

	if (todoText === '') {
		return;
	}

	const todoList = document.getElementById('todoList');
	const newTodoItem = document.createElement('li');
	newTodoItem.className = 'todoItem';

	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	newTodoItem.appendChild(checkbox);

	const todoLabel = document.createElement('label');
	todoLabel.textContent = todoText;
	newTodoItem.appendChild(todoLabel);

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Удалить';
	deleteButton.onclick = function () {
		todoList.removeChild(newTodoItem);
		saveToLocalStorage();
	};
	newTodoItem.appendChild(deleteButton);

	todoList.appendChild(newTodoItem);
	inputTodo.value = '';

	saveToLocalStorage();
};

function saveToLocalStorage() {
	const todoItems = document.getElementsByClassName('todoItem');
	const todoListArray = [];

	for (const item of todoItems) {
		const todoText = item.querySelector('label').textContent;
		const isChecked = item.querySelector('input').checked;
		todoListArray.push({ text: todoText, checked: isChecked });
	}

	localStorage.setItem('todoList', JSON.stringify(todoListArray));
};

function loadFromLocalStorage() {
	const todoList = document.getElementById('todoList');
	const storedTodoList = JSON.parse(localStorage.getItem('todoList'));

	if (storedTodoList) {
		for (const item of storedTodoList) {
			const newTodoItem = document.createElement('li');
			newTodoItem.className = 'todoItem';

			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = item.checked;
			newTodoItem.appendChild(checkbox);

			const todoLabel = document.createElement('label');
			todoLabel.textContent = item.text;
			newTodoItem.appendChild(todoLabel);

			const deleteButton = document.createElement('button');
			deleteButton.textContent = 'Удалить';
			deleteButton.onclick = function () {
				todoList.removeChild(newTodoItem);
				saveToLocalStorage();
			};
			newTodoItem.appendChild(deleteButton);

			todoList.appendChild(newTodoItem);
		}
	}
};


