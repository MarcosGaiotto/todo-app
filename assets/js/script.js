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
        let lInput = lItem.firstChild.firstChild.firstChild;
       
        checkItem(lInput);
        
        updateCheckEvent();
        
    });
    updateItensLeftList();
    clearItem();
}

function createTodoItem(description) {
    
    let listItem = document.createElement('li');
    listItem.className = 'todo-item-container';
    listItem.draggable = true;
    listItem.ondragstart = drag;
    listItem.ondragover = dragOver;
    listItem.ondrop = drop;

    let infoItem = document.createElement('div');
    infoItem.className = 'todo-info-container'

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

    let buttonItem = document.createElement('button');
    buttonItem.className = 'clear-btn';

    itemLabel.appendChild(itemInput);
    itemLabel.appendChild(itemSpan);

    infoItem.appendChild(itemLabel);
    infoItem.appendChild(itemDescription);

    listItem.appendChild(infoItem);
    listItem.appendChild(buttonItem);

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
    if(ev.target.firstChild.firstChild.firstChild.checked) {
        ev.dataTransfer.setData("text", ev.target.firstChild.lastChild.innerHTML + "-checked");
    } else {
        ev.dataTransfer.setData("text", ev.target.firstChild.lastChild.innerHTML);
    }
}

function dragOver(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    let target = ev.target;
    if(target.className !== "todo-item-container") {
        target = ev.target.parentNode.parentNode
    }
    let data = ev.dataTransfer.getData("text");
    let data2 = "";
    if (target.firstChild.firstChild.firstChild.checked) {
        data2 = target.firstChild.lastChild.innerHTML + "-checked";
    } else {
        data2 = target.firstChild.lastChild.innerHTML;
    }

    data = list.splice(list.indexOf(data),1);

    list2 = list.splice(list.indexOf(data2), list.length - list.indexOf(data2));

    list.push(data[0]);

    list2.forEach((item) => {
        list.push(item);
    })

    updateTodoList();
}

function clearItem() {
    let clearButton = document.querySelectorAll(".clear-btn");

    clearButton.forEach((button) => {
        button.addEventListener("click",(e) => {
            let itemToDelete = e.target.parentNode.firstChild.lastChild.innerHTML;
            if (e.target.parentNode.firstChild.firstChild.firstChild.checked) {
                list.splice(list.indexOf(itemToDelete + "-checked"), 1);
                localStorage.setItem('storageList', JSON.stringify(list));
                updateTodoList();
            } else {
                list.splice(list.indexOf(itemToDelete), 1);
                localStorage.setItem('storageList', JSON.stringify(list));
                updateTodoList();
            }
        });
    })
}