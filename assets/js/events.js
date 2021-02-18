document.addEventListener('DOMContentLoaded', () => {


    let inputs = document.querySelectorAll(".checkmark-input");
    inputs.forEach( (input) => {
        input.addEventListener("click", () => {
            checkItem(input);
            updateItensLeftList(input);
        });
    });

    let clearCompleted = document.getElementById('clear-completed');

    clearCompleted.addEventListener('click', () => {
        let inputs = document.querySelectorAll(".checkmark-input");
        inputs.forEach((input) => {
            let desc = input.parentNode.parentNode.lastChild.innerHTML;
            if(input.checked) {
                list.splice(list.indexOf(desc),1);
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
            let inputItem = input.parentNode.parentNode;
            inputItem.style.display = "flex";
            allFilter.className = "filter-select";
            activeFilter.className = "";
            completedFilter.className = "";
        });
    });

    

    activeFilter.addEventListener('click', () => {
        let inputs = document.querySelectorAll(".checkmark-input");
        inputs.forEach( (input) => {
            let inputItem = input.parentNode.parentNode;
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
            let inputItem = input.parentNode.parentNode;
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

});



