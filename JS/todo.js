const todoList = document.querySelector(".todo-container__list");
let todos = JSON.parse(localStorage.getItem(KEY_TODO)) || [];
let idCounter = Math.floor(Math.random() * 100000);
const users = JSON.parse(localStorage.getItem(KEY_USERS));
const currentUser = JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
document.getElementById("name").innerHTML = currentUser.fullName;
document.getElementById("admin").innerHTML = currentUser.isAdmin
  ? "Admin"
  : "";
const optionsToggle = () => {
  var toggleButtons = document.getElementsByClassName("options__toggleBtn");
  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        document.querySelectorAll(".todo__item").forEach((item) => {
          item.classList.remove("active");
        });
      } else {
        this.parentElement.parentElement.parentElement.className += " active";
      }
      // current[0].className = current[0].parentElement.parentElement.parentElement.className.replace(" active", "")
    });
  }
  document.addEventListener("click", (e) => {
    let options = document.querySelectorAll(".todo__options");
    options.forEach((option) => {
      if (e.target.contains(option)) {
        document.querySelectorAll(".todo__item").forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  });
};

const renderTodo = function () {
  let ListItem = "";
  if (todos) {
    todos.forEach((todo, index) => {
      ListItem += `
      <div class="todo__item" data-id="${todo.id}">
        <div class="item__header">
            <span class="item__id">${index + 1}</span>
              <p class="item__title">${todo.content}</p>
        </div>
        <div class="todo__body">
          <div class="todo__options">
            <button class="options__toggleBtn">
            <i class="fa-solid fa-ellipsis-vertical"></i></button>
            <div class="options__dropdown">
              <div class="edit" onclick="editTodo('${encodeURIComponent(JSON.stringify(todo))}')"  >
              <i class="fa-solid fa-pencil"></i> <span>Edit</span>
              </div>  
              <div class="addMember" onclick="showMember()"  >
                <i class="fa-solid fa-pencil"></i> <span>Add Member</span> 
              </div>
              <div class="delete" onclick="deleteTodo(${todo.id})">
                <i class="fa-solid fa-trash"></i> 
                <span>Delete</span>
              </div>
              </div>
            </div>
          </div>
      </div>`;
    });
  }
  todoList.innerHTML = ListItem;
};

const addTodo = function () {
  const newTodoContent =
    document.getElementsByClassName("new-todo__content")[0].value;
  if (newTodoContent != "") {
    todos.push({ id: idCounter++, content: newTodoContent });
    document.getElementsByClassName("new-todo__content")[0].value = "";
    localStorage.setItem(KEY_TODO, JSON.stringify(todos));
    location.reload();
  }
  renderTodo();
  optionsToggle();
};

const deleteTodo = function (id) {
  todos = todos.filter((todo) => todo.id != id);
  localStorage.setItem(KEY_TODO, JSON.stringify(todos));
  location.reload();

  renderTodo();
  optionsToggle();
};

const editTodo = function (todo)  {
  todo = JSON.parse(decodeURIComponent(todo));
  let items = document.querySelectorAll(".todo__item");
  items.forEach((item) => {
    if (item.dataset.id == todo.id) {
      item.innerHTML = `
              <input type=text value="${todo.content}" class="edit__content">
              <button type="button" class="btn2 edit__save" onclick="saveTodo(${todo.id})">Save</button>`;
    }
  });
};

const showMember = function () {
  document.getElementById("listuser-popup-container").style.display = "block";
}

const saveTodo = function (id) {
  const content = document.getElementsByClassName("edit__content")[0].value;
  if (content != "") {
    const index = todos.findIndex((todo) => todo.id == id);
    todos[index].content = content;
    localStorage.setItem(KEY_TODO, JSON.stringify(todos));
    location.reload();
    renderTodo();
    optionsToggle();
  }
};

const autoRedirect = function () {
  const key = localStorage.getItem(KEY_LOGGING);
  const isLogging = key === "false";
  if (isLogging) {
    location.pathname = "Todo/index.html";
  }
};

autoRedirect();
renderTodo();
optionsToggle();
