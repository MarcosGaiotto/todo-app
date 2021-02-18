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
        item = item.split("-", 2);
        let lItem = createTodoItem(item);
        todoList.appendChild(lItem);
        let lInput = lItem.firstChild.firstChild;
        checkItem(lInput);
        updateCheckEvent();
    });
    updateItensLeftList();
}

function createTodoItem(description) {
    
    let listItem = document.createElement('li');
    listItem.className = 'todo-item-container';
    listItem.draggable = true;
    listItem.ondragstart = drag;
    listItem.ondragover = dragOver;
    listItem.ondrop = drop;

    let itemLabel = document.createElement('label');
    itemLabel.className = 'checkmark-container';

    let itemInput = document.createElement('input');
    itemInput.type = 'checkbox';
    itemInput.className = 'checkmark-input';
    if(description[1] === "checked") {
        itemInput.checked = true;
    }

    let itemSpan = document.createElement('span');
    itemSpan.className = 'checkmark circle-icon';

    let itemDescription = document.createElement('p');
    itemDescription.innerHTML = description[0];

    itemLabel.appendChild(itemInput);
    itemLabel.appendChild(itemSpan);

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemDescription);

    return listItem;
}

function updateItensLeftList() {
    let inputs = document.querySelectorAll(".checkmark-input");
    let itensLeft = document.getElementById('itens-left');
    itensLeft.innerHTML = inputs.length;
    inputs.forEach( (input) => {
        if (input.checked) {
            if (itensLeft.innerHTML != 0){
                itensLeft.innerHTML = parseInt(itensLeft.innerHTML) -1;
            }
        }
    }); 
}

function checkItem(input) {
    let description = input.parentNode.parentNode.lastChild;
            
    if (input.checked) {
        description.style.textDecoration = "line-through";
        if (list.indexOf(description.innerHTML) > -1){
            list[list.indexOf(description.innerHTML)] = description.innerHTML + "-checked";
            localStorage.setItem('storageList', JSON.stringify(list));
        }
    } else {
        description.style.textDecoration = "none";
        if (list.indexOf(description.innerHTML) <= -1) {
            list[list.indexOf(description.innerHTML + "-checked")] = description.innerHTML;
            localStorage.setItem('storageList', JSON.stringify(list));
        }
    }
}

function updateCheckEvent() {
    let inputs = document.querySelectorAll(".checkmark-input");
    inputs.forEach( (input) => {
        input.addEventListener("click", () => {
            checkItem(input);
            updateItensLeftList();
        });
    });
}

function drag(ev) {
    if(ev.target.firstChild.firstChild.checked) {
        ev.dataTransfer.setData("text", ev.target.lastChild.innerHTML + "-checked");
    } else {
        ev.dataTransfer.setData("text", ev.target.lastChild.innerHTML);
    }
    
}

function dragOver(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let data2 = "";
    if (ev.target.firstChild.firstChild.checked) {
        data2 = ev.target.lastChild.innerHTML + "-checked";
    } else {
        data2 = ev.target.lastChild.innerHTML;
    }
    console.log(data, data2);
    console.log(list);
    let oldData = list.indexOf(data);
    let oldData2 = list.indexOf(data2)
    console.log(oldData, oldData2);
    list[oldData] = data2;
    list[oldData2] = data;
    console.log(list);
    updateTodoList();
}