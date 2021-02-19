document.addEventListener('DOMContentLoaded', () => {


    updateCheckEvent();

    let clearCompleted = document.getElementById('clear-completed');

    clearCompleted.addEventListener('click', () => {
        let inputs = document.querySelectorAll(".checkmark-input");
        inputs.forEach((input) => {
            let desc = input.parentNode.parentNode.lastChild.innerHTML;
            if(input.checked) {
                if(list.indexOf(desc) === -1) {
                    list.splice(list.indexOf(desc + "-checked"),1); 
                } else {
                    list.splice(list.indexOf(desc),1);
                }
                localStorage.setItem('storageList', JSON.stringify(list));
                updateTodoList();
            }
        });
    });

    let allFilter = document.getElementById('filter-all');
    let activeFilter = document.getElementById('filter-active');
    let completedFilter = document.getElementById('filter-completed');

    allFilter.addEventListener('click', () => {
        let inputs = document.querySelectorAll(".checkmark-input");
        inputs.forEach( (input) => {
            let inputItem = input.parentNode.parentNode.parentNode;
            inputItem.style.display = "flex";
            allFilter.className = "filter-select";
            activeFilter.className = "";
            completedFilter.className = "";
        });
    });

    

    activeFilter.addEventListener('click', () => {
        let inputs = document.querySelectorAll(".checkmark-input");
        inputs.forEach( (input) => {
            let inputItem = input.parentNode.parentNode.parentNode;
            if (input.checked) {
                inputItem.style.display = "none";
            } else {
                inputItem.style.display = "flex";
            }
            allFilter.className = "";
            activeFilter.className = "filter-select";
            completedFilter.className = "";
        });
    });

    

    completedFilter.addEventListener('click', () => {
        let inputs = document.querySelectorAll(".checkmark-input");
        inputs.forEach( (input) => {
            let inputItem = input.parentNode.parentNode.parentNode;
            if (!input.checked) {
                inputItem.style.display = "none";
            } else {
                inputItem.style.display = "flex";
            }
            allFilter.className = "";
            activeFilter.className = "";
            completedFilter.className = "filter-select";
        });
    });

    let iconChanger= document.getElementById('icon-changer');
    let headerBackground = document.getElementById("header-background");
    let body = document.getElementById("body");
    let newTodoContainer = document.getElementById("new-todo-container");
    let todoFooter = document.getElementById("todo-footer");
    let todoFilter = document.getElementById("todo-filter");
    let newTodo = document.getElementById("new-todo");
    let attribution = document.getElementById("attribution");
    

    iconChanger.addEventListener('click', () => {
        console.log("fui clicado")
        let listItemContainer = document.querySelectorAll(".todo-item-container");
        if(iconChanger.className === "icon sun") {
            iconChanger.className = "icon moon";
            headerBackground.className = "header-container header-light";
            body.className = "body-light";
            newTodoContainer.className = "new-todo-container container-light";
            todoFooter.className = "todo-list-footer-container container-light";
            todoFilter.className = "filter-container container-light";
            newTodo.className = "container-light";
            listItemContainer.forEach((item) =>{
                item.className = "todo-item-container container-light";
            });
            attribution.className = "attribution attribution-light";
        } else {
            iconChanger.className = "icon sun";
            headerBackground.className = "header-container header-dark";
            body.className = "body-dark";
            newTodoContainer.className = "new-todo-container container-dark";
            todoFooter.className = "todo-list-footer-container container-dark";
            todoFilter.className = "filter-container container-dark";
            newTodo.className = "container-dark";
            listItemContainer.forEach((item) =>{
                item.className = "todo-item-container container-dark"
            });
            attribution.className = "attribution attribution-dark";
        }
    })
});



