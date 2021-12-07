const addForm = document.querySelector(".add");
const toDoList = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = toDo => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${toDo}</span>
    <i class="far fa-trash-alt delete"></i>
</li>`;

    toDoList.innerHTML += html;
};

// create to do

addForm.addEventListener("submit", e => {
    // prevent page from reloading
    e.preventDefault();
    // take in todo
    const toDo = addForm.add.value.trim();

    if (toDo.length) {
        generateTemplate(toDo);
        addForm.reset();
    }
});

// delete todos

toDoList.addEventListener("click", e => {
    let clickObject = e.target;

    if (clickObject.classList.contains("delete")) {
        clickObject.parentElement.remove();
    }
});


// callback function to filter search input

const filterToDos = term => {
    Array.from(toDoList.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add("filtered"));

    Array.from(toDoList.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove("filtered"));
}

// keyup event
search.addEventListener("keyup", e => {
    const term = search.value.trim().toLowerCase();
    filterToDos(term);
})