// let todos = JSON.parse(localStorage.getItem("todo-data"))
const todoList = document.querySelector(".todo-container__list")

let todos = [{ id: 1, content: "Learn JavaScript" }]
let idCounter = 2

const optionsToggle = () => {
    var toggleBtns = document.getElementsByClassName("options__toggleBtn")
    for (var i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active")
            if (current.length > 0) {
                document.querySelectorAll(".todo__item").forEach(item => {
                    item.classList.remove("active")
                })
            } else {
                this.parentElement.parentElement.parentElement.className += " active"
            }
            // current[0].className = current[0].parentElement.parentElement.parentElement.className.replace(" active", "")
        })
    }
    // for (let i = 0; i < toggleBtns.length; i++) {
    //     toggleBtns[i].addEventListener("click", (e) => {
    //         var current = document.getElementsByClassName("active")
    //         console.log(this.className)
    //         // If there"s no active class
    //         if (current.length > 0) {
    //             current[0].className = current[0].className.replace(" active", "")
    //         }

    //         // Add the active class to the current/clicked button
    //         this.className += " active"
    //     }
    //     )
    // }
    // toggleBtns.forEach(btn => {
    //     btn.addEventListener("click", (e) => {
    //         var current = document.getElementsByClassName("active")
    //         console.log(this.className)
    //         // If there"s no active class
    //         if (current.length > 0) {
    //             current[0].className = current[0].className.replace(" active", "")
    //         }

    //         // Add the active class to the current/clicked button
    //         this.className += " active"
    //     })
    // })

    document.addEventListener("click", (e) => {
        let options = document.querySelectorAll(".todo__options")
        options.forEach(option => {
            if (e.target.contains(option)) {
                document.querySelectorAll(".todo__item").forEach(item => {
                    item.classList.remove("active")
                })
            }
        })
    })
}

const renderTodo = () => {
    let ListItem = ""
    if (todos) {
        todos.forEach((todo, index) => {
            ListItem += `<div class="todo__item" data-id="${todo.id}">
            <div class="item__header">
            <span class="item__id">${index + 1}</span>
            <p class="item__title">${todo.content}</p>
            </div>
            <div class="todo__body">
            <div class="todo__options">
            <button class="options__toggleBtn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="options__dropdown">
            <div class="edit" onclick="editTodo('${encodeURIComponent(JSON.stringify(todo))}')"  ><i class="fa-solid fa-pencil"></i> <span>Edit</span></div>
            <div class="delete" onclick="deleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i> <span>Delete</span></div>
            </div>
            </div>
            </div>
            </div>`
        })
    }
    todoList.innerHTML = ListItem
}

const addTodo = () => {
    const newTodoContent = document.getElementsByClassName("new-todo__content")[0].value
    if (newTodoContent != "") {
        todos.push({ id: idCounter++, content: newTodoContent })
        document.getElementsByClassName("new-todo__content")[0].value = ""
    }
    renderTodo()
    optionsToggle()

}

const deleteTodo = (id) => {
    console.log(id)
    todos = todos.filter((todo) => todo.id != id)
    console.log(todos)

    renderTodo()
    optionsToggle()
}
const editTodo = (todo) => {
    todo = JSON.parse(decodeURIComponent(todo))
    let items = document.querySelectorAll('.todo__item')
    items.forEach(item => {
        if(item.dataset.id == todo.id) {
            console.log(todo.content)
            item.innerHTML = `
            <input type=text value="${todo.content}" class="edit__content">
            <button type="button" class="edit__save" onclick="saveTodo(${todo.id})">Save</button>`
        }
    })
}

const saveTodo = (id) => {
    const content = document.getElementsByClassName("edit__content")[0].value
    if(content != ''){
        const index = todos.findIndex(todo => todo.id == id)
        todos[index].content = content
        console.log(todos)
        renderTodo()
        optionsToggle()
    }

}

// let todoEditID,
//     edit = document.querySelectorAll('.edit')
// isEditTodo = false

// edit.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         let id = e.target.dataset.editid
//         let editdata = e.target.dataset.editdata
//         isEditTodo = true
//         todoEditID = id
//         newTodoContainer.classList.add('show')
//         newTodoContainer.querySelector('.title').innerText = 'Edit Todo'
//         todoData.value = editdata
//     })
// })

// let toggleBtns = document.getElementsByClassName("options__toggleBtn")
// console.log(toggleBtns)


renderTodo()
optionsToggle()