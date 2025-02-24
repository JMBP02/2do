const todo = [];

displayTodo();

function displayTodo() {
    let todolistHTML = "";
    for (let i = 0; i < todo.length; i++) {
        const todoObject = todo[i];
        const name = todoObject.name;
        const dueDate = todoObject.dueDate;
        const time = todoObject.time;
        const priorityClass = todoObject.isPriority ? "priority" : "";
        const priorityButton = todoObject.isPriority
            ? `<button class="deleteDesign" onclick="removePriority(${i})">Remove Priority</button>`
            : `<button class="priorityDesign" onclick="setPriority(${i})">Priority</button>`;
        const html = `
            <div class="js-todo-layout ${priorityClass}">
                <div class="dataLayout">${name}</div>
                <div class="dataLayout">${dueDate}</div>
                <div class="dataLayout">${time}</div>
                <div class="buttonContainer">
                    ${priorityButton}
                    <button class="deleteDesign" onclick="todo.splice(${i}, 1); displayTodo()">Delete</button>
                </div>
            </div>
        `;
        todolistHTML += html;
    }
    document.querySelector(".js-todoList").innerHTML = todolistHTML;
}

function setPriority(index) {
    // Prevent re-prioritizing if already prioritized
    if (todo[index].isPriority) return;

    todo[index].isPriority = true; // Mark the task as priority
    const item = todo.splice(index, 1)[0]; // Remove it from its current position
    todo.unshift(item); // Add it to the top of the list
    displayTodo(); // Re-render the list
}

function removePriority(index) {
    todo[index].isPriority = false; // Unmark the task as priority
    const item = todo.splice(index, 1)[0]; // Remove it from its current position
    todo.push(item); // Add it back to the end of the list
    displayTodo(); // Re-render the list
}

function addTodo() {
    const getName = document.querySelector(".js-inputName");
    const getDueDate = document.querySelector(".js-inputDate");
    const getTime = document.querySelector(".js-inputTime");

    const todoName = getName.value;
    const todoDate = getDueDate.value;
    const todoTime = getTime.value;

    todo.push({ name: todoName, dueDate: todoDate, time: todoTime, isPriority: false });
    console.log(todo);

    getDueDate.value = "";
    getName.value = "";
    getTime.value = "";

    displayTodo();
}

function enterKey(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}