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
            window.location.href = window.location.href
        }
    
    });


    newTodo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (newTodo.value != "") {
                list.push(newTodo.value);
                localStorage.setItem('storageList', JSON.stringify(list));
                window.location.href = window.location.href
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
        let lInput = lItem.firstChild.firstChild;
        updateItensLeftList(lInput);

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

function updateItensLeftList(input) {
    let itensLeft = document.getElementById('itens-left');
    if (input.checked) {
        if (itensLeft.innerHTML != 0){
            itensLeft.innerHTML = parseInt(itensLeft.innerHTML) -1;
        }
    } else {
        itensLeft.innerHTML = parseInt(itensLeft.innerHTML) +1;
    }
}

function checkItem(input) {
    let description = input.parentNode.parentNode.lastChild;
            
    if (input.checked) {
        description.style.textDecoration = "line-through";
       
    } else {
        description.style.textDecoration = "none";
    }
}