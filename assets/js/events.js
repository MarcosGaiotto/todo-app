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
        inputs.forEach((input) => {
            let description = input.parentNode.parentNode.lastChild.innerHTML;
            if(input.checked) {
                console.log(description);
                list.splice(list.indexOf(description),1);
                localStorage.setItem('storageList', JSON.stringify(list));
                updateTodoList();
            }
        });
    });

});


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