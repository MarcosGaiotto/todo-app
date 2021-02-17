let storageList = localStorage.getItem('storageList');
let list = storageList ? JSON.parse(storageList) : [];



document.addEventListener('DOMContentLoaded', () => {
    if (storageList != "" && storageList != null) {
        updateTodoList();
    }

    let newTodoButton = document.getElementById('new-todo-btn');

    let newTodo = document.getElementById('new-todo');

    newTodoButton.addEventListener('click', () => {
        if (newTodo.value != "") {
            list.push(newTodo.value);
            localStorage.setItem('storageList', JSON.stringify(list));
            updateTodoList();
            newTodo.value = "";
        }
    
    });


    newTodo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (newTodo.value != "") {
                list.push(newTodo.value);
                localStorage.setItem('storageList', JSON.stringify(list));
                updateTodoList();
                newTodo.value = "";
            }
        }
    });
    
});


function updateTodoList() {
    let todoList = document.getElementById('todo-list');
    let itensLeft = document.getElementById('itens-left');

    todoList.innerHTML = "";
    itensLeft.innerHTML = 0;


    list.forEach(function(item) {
        let lItem = createTodoItem(item);
        todoList.appendChild(lItem);
        let input = lItem.firstChild.firstChild;
        updateItensLeftList(input)
    });
}

function createTodoItem(description) {
    let listItem = document.createElement('li');
    listItem.className = 'todo-item-container';

    let itemLabel = document.createElement('label');
    itemLabel.className = 'checkmark-container';

    let itemInput = document.createElement('input');
    itemInput.type = 'checkbox';
    itemInput.className = 'checkmark-input';

    let itemSpan = document.createElement('span');
    itemSpan.className = 'checkmark circle-icon';

    let itemDescription = document.createElement('p');
    itemDescription.innerHTML = description;

    itemLabel.appendChild(itemInput);
    itemLabel.appendChild(itemSpan);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemDescription);

    return listItem;
}